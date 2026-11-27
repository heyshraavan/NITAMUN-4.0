/**
 * NITAMUN 4.0 - Secure Secretariat Inquiry Ingestion Endpoint
 * 
 * Architecture & Security Controls:
 * 1. Strict HTTP Method Control: Only POST requests are permitted.
 *    Any GET, HEAD, PUT, DELETE, PATCH request is rejected with 405 Method Not Allowed.
 * 2. Payload Validation: Validates inquiry fields before transmission.
 * 3. Response Redaction: Sanitizes all output; no database or internal records are returned.
 */

import type { IncomingMessage, ServerResponse } from 'node:http';

interface VercelRequestLike extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
}

interface VercelResponseLike extends ServerResponse {
  status?: (statusCode: number) => VercelResponseLike;
  json?: (data: any) => VercelResponseLike;
  send?: (data: any) => VercelResponseLike;
}

function sendResponse(res: VercelResponseLike, statusCode: number, data: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }

  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendResponse(res, 405, {
      success: false,
      error: 'Method Not Allowed. Only POST submissions are accepted on this endpoint.',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return sendResponse(res, 400, {
          success: false,
          error: 'Malformed request: Invalid JSON body.',
        });
      }
    }

    if (!body || typeof body !== 'object') {
      return sendResponse(res, 400, {
        success: false,
        error: 'Malformed request: Body must be a JSON object.',
      });
    }

    const record = body.data
      ? Array.isArray(body.data)
        ? body.data[0]
        : body.data
      : body;

    if (!record || typeof record !== 'object') {
      return sendResponse(res, 400, {
        success: false,
        error: 'Malformed request: Missing inquiry record payload.',
      });
    }

    const fullName = String(record.full_name || record.fullName || '').trim();
    const email = String(record.email || '').trim().toLowerCase();
    const inquiryClassification = String(
      record.inquiry_classification || record.inquiryClassification || ''
    ).trim();
    const message = String(record.message || '').trim();

    if (!fullName || fullName.length < 2) {
      return sendResponse(res, 400, { success: false, error: 'Full name is required.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendResponse(res, 400, { success: false, error: 'A valid email address is required.' });
    }

    if (!inquiryClassification) {
      return sendResponse(res, 400, { success: false, error: 'Inquiry classification is required.' });
    }

    if (!message || message.length < 5) {
      return sendResponse(res, 400, { success: false, error: 'Message must be at least 5 characters.' });
    }

    const timestamp = record.timestamp || new Date().toISOString();
    const sanitizedRecord = {
      timestamp,
      full_name: fullName,
      email,
      inquiry_classification: inquiryClassification,
      message,
      status: 'Pending',
    };

    const upstreamUrl = (
      process.env.SHEETDB_INQUIRY_API_URL ||
      process.env.VITE_SHEETDB_INQUIRY_API_URL ||
      'https://sheetdb.io/api/v1/s0lfoie3eqpyp'
    ).trim();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (process.env.SHEETDB_BEARER_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.SHEETDB_BEARER_TOKEN.trim()}`;
    }

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: [sanitizedRecord] }),
    });

    if (!upstreamResponse.ok) {
      return sendResponse(res, 502, {
        success: false,
        error: `Inquiry service temporarily unavailable (status ${upstreamResponse.status}). Please try again shortly.`,
      });
    }

    return sendResponse(res, 200, {
      success: true,
      message: 'Your inquiry has been successfully transmitted to the Secretariat.',
    });
  } catch (err: any) {
    return sendResponse(res, 500, {
      success: false,
      error: 'An unexpected internal error occurred while processing your inquiry.',
    });
  }
}
