import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://shashiprabha.com';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const notesIndexPath = path.join(projectRoot, 'public', 'content', 'notes', 'index.json');
const blogIndexPath = path.join(projectRoot, 'public', 'content', 'blog', 'index.json');
const sitemapPath = path.join(projectRoot, 'sitemap.xml');

function slugFromMarkdownFilename(filename) {
  return filename.replace(/\.md$/i, '');
}

function toAbsoluteUrl(routePath) {
  return encodeURI(`${SITE_ORIGIN}${routePath}`);
}

async function loadIndex(indexPath) {
  try {
    const raw = await readFile(indexPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((entry) => typeof entry === 'string');
  } catch {
    return [];
  }
}

async function main() {
  const noteFiles = await loadIndex(notesIndexPath);
  const blogFiles = await loadIndex(blogIndexPath);

  const routes = [
    '/',
    '/notes',
    '/blog',
    ...noteFiles.map((filename) => `/notes/${slugFromMarkdownFilename(filename)}`),
    ...blogFiles.map((filename) => `/blog/${slugFromMarkdownFilename(filename)}`),
  ];

  const uniqueRoutes = Array.from(new Set(routes));
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueRoutes.map((route) => `  <url>\n    <loc>${toAbsoluteUrl(route)}</loc>\n  </url>`),
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(sitemapPath, sitemap, 'utf-8');
  process.stdout.write(`Updated sitemap.xml with ${uniqueRoutes.length} URLs.\n`);
}

main().catch((error) => {
  process.stderr.write(`Failed to refresh sitemap: ${error.message}\n`);
  process.exit(1);
});
