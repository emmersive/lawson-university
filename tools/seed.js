#!/usr/bin/env node
/**
 * Lawson University — DA.live Content Seeder
 *
 * Uploads all HTML files from /content-seed to a DA.live org/site.
 *
 * Usage:
 *   node tools/seed.js --org <org> --site <site> --token <token>
 *
 * Options:
 *   --org    DA.live organisation name (required)
 *   --site   DA.live site name (required)
 *   --token  DA.live API token (required; or set DA_TOKEN env var)
 *   --dry-run  Print files to be uploaded without uploading
 *   --path   Seed only a specific path, e.g. /study/index.html
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SEED_DIR = join(__dirname, '../content-seed');
const DA_API = 'https://admin.da.live';

// Parse CLI args
const args = Object.fromEntries(
  process.argv.slice(2)
    .reduce((pairs, val, i, arr) => {
      if (val.startsWith('--')) pairs.push([val.slice(2), arr[i + 1] ?? true]);
      return pairs;
    }, []),
);

const ORG = args.org;
const SITE = args.site;
const TOKEN = args.token || process.env.DA_TOKEN;
const DRY_RUN = args['dry-run'] === true || args['dry-run'] === 'true';
const FILTER_PATH = args.path || null;

if (!ORG || !SITE) {
  console.error('Error: --org and --site are required.');
  console.error('Usage: node tools/seed.js --org <org> --site <site> --token <token>');
  process.exit(1);
}

if (!TOKEN && !DRY_RUN) {
  console.error('Error: --token or DA_TOKEN env var is required (unless --dry-run).');
  process.exit(1);
}

/** Recursively collect all .html files under a directory */
function collectFiles(dir, base = dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...collectFiles(fullPath, base));
    } else if (extname(entry) === '.html') {
      files.push(fullPath);
    }
  }
  return files;
}

/** Convert local file path to DA.live API path */
function toDaPath(filePath) {
  const rel = relative(SEED_DIR, filePath);
  // content-seed/study/index.html → /study/index
  return '/' + rel.replace(/\.html$/, '').replace(/\\/g, '/');
}

/** Upload a single HTML file to DA.live */
async function uploadFile(filePath, daPath) {
  const content = readFileSync(filePath, 'utf-8');
  const url = `${DA_API}/source/${ORG}/${SITE}${daPath}.html`;

  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'text/html',
    },
    body: content,
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }
  return resp.status;
}

async function main() {
  const files = collectFiles(SEED_DIR);
  const filtered = FILTER_PATH
    ? files.filter((f) => toDaPath(f).startsWith(FILTER_PATH))
    : files;

  console.log(`\nLawson University — DA.live Content Seeder`);
  console.log(`Org: ${ORG} | Site: ${SITE} | Files: ${filtered.length}${DRY_RUN ? ' | DRY RUN' : ''}\n`);

  let success = 0;
  let failed = 0;

  for (const file of filtered) {
    const daPath = toDaPath(file);
    if (DRY_RUN) {
      console.log(`  [dry-run] ${daPath}`);
      success++;
      continue;
    }

    try {
      const status = await uploadFile(file, daPath);
      console.log(`  ✓ ${daPath} (${status})`);
      success++;
    } catch (err) {
      console.error(`  ✗ ${daPath} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} uploaded, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main();
