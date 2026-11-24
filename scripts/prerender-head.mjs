#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const templatePath = path.resolve(distDir, 'index.html');
const seoPath = path.resolve(projectRoot, 'src/data/seo.ts');

/**
 * Escapes characters for HTML attribute values (inside double quotes)
 */
function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Escapes characters for HTML text content (e.g. inside <title>)
 */
function escapeText(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function loadSeoMetadata() {
  try {
    // Native TypeScript import in Node 22+ / 24+
    const mod = await import('../src/data/seo.ts');
    return mod.PAGE_SEO_METADATA;
  } catch (nativeErr) {
    // Fallback for Node environments (like Node 20 on CI) using Vite's bundled esbuild
    try {
      const esbuild = (await import('esbuild')).default;
      const tsCode = fs.readFileSync(seoPath, 'utf8');
      const { code } = esbuild.transformSync(tsCode, { loader: 'ts', format: 'esm' });
      const dataUri = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
      const mod = await import(dataUri);
      return mod.PAGE_SEO_METADATA;
    } catch (fallbackErr) {
      console.error('Failed to load SEO metadata from src/data/seo.ts:');
      console.error('Native error:', nativeErr.message);
      console.error('Fallback error:', fallbackErr.message);
      process.exit(1);
    }
  }
}

/**
 * Injects route-specific SEO head tags into template HTML
 */
function generateRouteHtml(templateHtml, routeKey, meta) {
  let html = templateHtml;

  // 1. Document Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeText(meta.title)}</title>`);

  // 2. Meta description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  );

  // 3. Canonical URL
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`
  );

  // 4. Open Graph Tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(meta.ogDescription)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`
  );

  // 5. Twitter Card Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(meta.twitterTitle)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(meta.twitterDescription)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:url" content="${escapeAttr(meta.canonical)}" />`
  );

  // 6. Structured Data (Schema.org Event JSON-LD)
  // Per requirements: Keep Event JSON-LD on homepage only; remove on subpages to avoid duplicate/conflicting schemas
  if (routeKey !== 'home') {
    html = html.replace(/<!-- Schema\.org Event JSON-LD Structured Data -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/i, '');
  }

  return html;
}

async function runPrerender() {
  console.log('--- Starting Lightweight Head-Only Static Prerendering ---');

  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found at ${templatePath}. Run 'vite build' first.`);
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  const PAGE_SEO_METADATA = await loadSeoMetadata();

  const routes = [
    { key: 'home', relativePath: 'index.html' },
    { key: 'about', relativePath: path.join('about', 'index.html') },
    { key: 'events', relativePath: path.join('events', 'index.html') },
    { key: 'committees', relativePath: path.join('committees', 'index.html') },
    { key: 'registration', relativePath: path.join('registration', 'index.html') },
    { key: 'contact', relativePath: path.join('contact', 'index.html') },
  ];

  for (const route of routes) {
    const meta = PAGE_SEO_METADATA[route.key];
    if (!meta) {
      console.error(`Missing SEO metadata for route: ${route.key}`);
      process.exit(1);
    }

    const outputHtml = generateRouteHtml(templateHtml, route.key, meta);
    const targetFile = path.resolve(distDir, route.relativePath);
    const targetDir = path.dirname(targetFile);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, outputHtml, 'utf8');
    console.log(`✓ Generated ${route.relativePath} (Canonical: ${meta.canonical})`);
  }

  console.log('--- Static Head Prerendering Complete: 6 routes generated ---');
}

runPrerender();
