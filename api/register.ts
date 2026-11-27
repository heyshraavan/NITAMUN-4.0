/**
 * NITAMUN 4.0 - Secure Registration Ingestion Endpoint
 * 
 * Architecture & Security Controls:
 * 1. Strict HTTP Method Control: Only POST requests are permitted.
 *    Any GET, HEAD, PUT, DELETE, PATCH request is rejected with 405 Method Not Allowed.
 *    This prevents unauthenticated enumeration or retrieval of registration records.
 * 2. Payload Validation & Sanitization: Validates schema before contacting upstream storage.
 * 3. Credential Insulation: Upstream storage credentials/endpoints are accessed exclusively
 *    server-side and are NEVER returned or exposed to client browsers.
 * 4. Response Redaction: The upstream response is sanitized. No delegate records or
 *    database metadata are ever returned in API responses.
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
  // 1. Enforce strict POST method - reject all GET/read attempts
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendResponse(res, 405, {
      success: false,
      error: 'Method Not Allowed. Only POST submissions are accepted on this endpoint.',
    });
  }

  try {
    // 2. Parse request body if needed
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

    // Handle both { data: { ... } }, { data: [ { ... } ] } and direct object formats
    const record = body.data
      ? Array.isArray(body.data)
        ? body.data[0]
        : body.data
      : body;

    if (!record || typeof record !== 'object') {
      return sendResponse(res, 400, {
        success: false,
        error: 'Malformed request: Missing registration record payload.',
      });
    }

    // 3. Validate mandatory fields
    const fullName = String(record.full_name || record.fullName || '').trim();
    const email = String(record.email || '').trim().toLowerCase();
    const rawPhone = String(record.phone || '').trim();
    const cleanedPhone = rawPhone.replace(/[^0-9]/g, '');
    const gender = String(record.gender || '').trim();
    const institution = String(record.institution || '').trim();
    const academicYear = String(record.academic_year || record.academicYear || '').trim();
    const munExperience = String(record.mun_experience || record.munExperience || '').trim();
    const pref1Committee = String(record.preference_1_committee || record.preference1Committee || '').trim();
    const pref2Committee = String(record.preference_2_committee || record.preference2Committee || '').trim();
    const consent = record.consent === true || record.consent === 'true' || record.consent === 1;

    if (!fullName || fullName.length < 2) {
      return sendResponse(res, 400, { success: false, error: 'Full name is required (min 2 characters).' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendResponse(res, 400, { success: false, error: 'A valid email address is required.' });
    }

    if (!rawPhone || cleanedPhone.length < 8 || cleanedPhone.length > 15) {
      return sendResponse(res, 400, { success: false, error: 'A valid phone number (8–15 digits) is required.' });
    }

    if (!gender) {
      return sendResponse(res, 400, { success: false, error: 'Gender is required.' });
    }

    if (!institution || institution.length < 2) {
      return sendResponse(res, 400, { success: false, error: 'Institution name is required.' });
    }

    if (!academicYear) {
      return sendResponse(res, 400, { success: false, error: 'Academic year is required.' });
    }

    if (!munExperience) {
      return sendResponse(res, 400, { success: false, error: 'MUN experience is required.' });
    }

    if (!pref1Committee) {
      return sendResponse(res, 400, { success: false, error: 'Committee Preference 1 is required.' });
    }

    if (!pref2Committee) {
      return sendResponse(res, 400, { success: false, error: 'Committee Preference 2 is required.' });
    }

    if (pref1Committee === pref2Committee) {
      return sendResponse(res, 400, { success: false, error: 'Preference 1 and Preference 2 committees must be distinct.' });
    }

    if (!consent) {
      return sendResponse(res, 400, { success: false, error: 'Terms and Privacy Policy consent is required.' });
    }

    // 4. Construct sanitized data record matching Google Sheet schema
    const timestamp = record.timestamp || record.texttimestamp || new Date().toISOString();
    const sanitizedRecord = {
      timestamp,
      texttimestamp: timestamp,
      full_name: fullName,
      email,
      phone: rawPhone,
      gender,
      institution,
      academic_year: academicYear,
      mun_experience: munExperience,

      preference_1_committee: pref1Committee,
      preference_1_portfolio_1: String(record.preference_1_portfolio_1 || record.preference1Portfolio1 || '').trim(),
      preference_1_portfolio_2: String(record.preference_1_portfolio_2 || record.preference1Portfolio2 || '').trim(),
      preference_1_portfolio_3: String(record.preference_1_portfolio_3 || record.preference1Portfolio3 || '').trim(),
      preference_1_portfolio_4: String(record.preference_1_portfolio_4 || record.preference1Portfolio4 || '').trim(),

      preference_2_committee: pref2Committee,
      preference_2_portfolio_1: String(record.preference_2_portfolio_1 || record.preference2Portfolio1 || '').trim(),
      preference_2_portfolio_2: String(record.preference_2_portfolio_2 || record.preference2Portfolio2 || '').trim(),
      preference_2_portfolio_3: String(record.preference_2_portfolio_3 || record.preference2Portfolio3 || '').trim(),
      preference_2_portfolio_4: String(record.preference_2_portfolio_4 || record.preference2Portfolio4 || '').trim(),

      preference_3_committee: String(record.preference_3_committee || record.preference3Committee || '').trim(),
      preference_3_portfolio_1: String(record.preference_3_portfolio_1 || record.preference3Portfolio1 || '').trim(),
      preference_3_portfolio_2: String(record.preference_3_portfolio_2 || record.preference3Portfolio2 || '').trim(),
      preference_3_portfolio_3: String(record.preference_3_portfolio_3 || record.preference3Portfolio3 || '').trim(),
      preference_3_portfolio_4: String(record.preference_3_portfolio_4 || record.preference3Portfolio4 || '').trim(),

      preference_4_committee: String(record.preference_4_committee || record.preference4Committee || '').trim(),
      preference_4_portfolio_1: String(record.preference_4_portfolio_1 || record.preference4Portfolio1 || '').trim(),
      preference_4_portfolio_2: String(record.preference_4_portfolio_2 || record.preference4Portfolio2 || '').trim(),
      preference_4_portfolio_3: String(record.preference_4_portfolio_3 || record.preference4Portfolio3 || '').trim(),
      preference_4_portfolio_4: String(record.preference_4_portfolio_4 || record.preference4Portfolio4 || '').trim(),

      consent: true,
    };

    // 5. Secure Upstream Submission
    const upstreamUrl = (
      process.env.SHEETDB_API_URL ||
      process.env.SHEETDB_REGISTRATION_URL ||
      process.env.VITE_SHEETDB_API_URL ||
      'https://sheetdb.io/api/v1/32lxk4x4tllo7'
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
        error: `Registration service temporarily unavailable (status ${upstreamResponse.status}). Please try again shortly.`,
      });
    }

    // 6. Return sanitized success response - NEVER reflect upstream data or sheet contents
    return sendResponse(res, 200, {
      success: true,
      message: 'Registration successfully received and confirmed.',
    });
  } catch (err: any) {
    return sendResponse(res, 500, {
      success: false,
      error: 'An unexpected internal error occurred while processing your registration. Please try again.',
    });
  }
}
