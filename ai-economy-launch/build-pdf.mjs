// Renders briefing.md (exported from the Claude Docs draft) into the downloadable PDF.
//   node ai-economy-launch/build-pdf.mjs
// Needs markdown-it (already in node_modules) and Playwright's Chromium.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, 'ai-economy-briefing-2026-10.pdf');

let src = readFileSync(join(here, 'briefing.md'), 'utf8');
const [, title] = src.match(/^# (.+)\n/);
src = src.replace(/^# .+\n+/, '');
// Byline: the doc's date and mention chips export as plain text.
const [, byline] = src.match(/^(.+)\n/);
src = src.replace(/^.+\n+/, '');

// The doc's interactive value-chain widget doesn't export; draw the eight layers from the table instead.
const LAYERS = [
  'Resellers and implementers', 'Platforms and apps', 'Model labs', 'Clouds and neoclouds',
  'Data centers (landlords)', 'Power and land', 'Chips and systems', 'Materials, fabs, memory',
];
const chain = `<figure class="chain" aria-label="AI value chain: eight layers, cash flowing down, credit flowing up">
  <div class="flow down">Cash ↓</div>
  <ol>${LAYERS.map((l, i) => `<li><span>${8 - i}</span>${l}</li>`).join('')}</ol>
  <div class="flow up">Credit ↑</div>
</figure>`;
src = src.replace(/^&#91;embedded content:.*$/m, '@@CHAIN@@');

const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
let body = md.render(src).replace('<p>@@CHAIN@@</p>', chain);
body = body.replace(/<li>\[ \] /g, '<li class="task">');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  @page { size: A4; margin: 20mm 18mm 22mm; }
  @page :first { margin: 0; }
  :root { --ink:#14130F; --body:#2E2C27; --muted:#5C5952; --rule:#E2DED4; --orange:#F58220; --accent:#B85A0B; --ground:#FAF8F3; }
  * { box-sizing: border-box; }
  body { font: 10pt/1.55 Archivo, Helvetica, Arial, sans-serif; color: var(--body); margin: 0; }
  .cover { height: 297mm; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;
           background: #0C0C0A; color: #F2F0EA; padding: 30mm 22mm; }
  .cover .brand { font: 500 9pt 'JetBrains Mono', monospace; letter-spacing: .16em; text-transform: uppercase; color: var(--orange); }
  .cover h1 { font-size: 40pt; line-height: 1.02; letter-spacing: -.035em; font-weight: 600; margin: 0 0 8mm; max-width: 14ch; }
  .cover .rule { width: 28mm; height: 3px; background: var(--orange); margin-bottom: 8mm; }
  .cover .meta { font: 9pt 'JetBrains Mono', monospace; color: #A8A49A; }
  h2 { font-size: 17pt; letter-spacing: -.02em; color: var(--ink); margin: 0 0 3mm; padding-top: 3mm; border-top: 3px solid var(--orange);
       margin-top: 9mm; break-after: avoid; }
  .cover + h2 { margin-top: 0; }
  p:has(+ ul), p:has(+ ol), p:has(+ table), p:has(+ .chain) { break-after: avoid; }
  h3 { font-size: 12pt; color: var(--ink); margin: 6mm 0 2mm; page-break-after: avoid; }
  p, li { orphans: 3; widows: 3; }
  strong { color: var(--ink); font-weight: 600; }
  a { color: var(--accent); text-decoration: none; }
  ol, ul { padding-left: 5mm; }
  li { margin: 1mm 0; }
  li.task { list-style: none; margin-left: -5mm; }
  li.task::before { content: '☐ '; color: var(--accent); }
  table { width: 100%; border-collapse: collapse; font-size: 7.6pt; line-height: 1.4; margin: 3mm 0 4mm; page-break-inside: auto; }
  tr { page-break-inside: avoid; }
  th { text-align: left; font: 500 6.8pt 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .06em;
       color: var(--muted); border-bottom: 1.5px solid var(--ink); padding: 1.6mm 1.6mm; }
  td { border-bottom: 1px solid var(--rule); padding: 1.6mm; vertical-align: top; }
  .chain { margin: 4mm 0; display: grid; grid-template-columns: 16mm 1fr 16mm; gap: 3mm; align-items: center; page-break-inside: avoid; }
  .chain ol { list-style: none; padding: 0; margin: 0; display: grid; gap: 1.2mm; }
  .chain li { margin: 0; background: var(--ground); border-left: 3px solid var(--orange); padding: 1.8mm 3mm; color: var(--ink); font-weight: 500; }
  .chain li span { font: 8pt 'JetBrains Mono', monospace; color: var(--accent); margin-right: 3mm; }
  .flow { font: 500 8pt 'JetBrains Mono', monospace; color: var(--muted); text-align: center; writing-mode: vertical-rl; transform: rotate(180deg); justify-self: center; }
  .flow.up { transform: none; }
</style></head><body>
<section class="cover">
  <div class="brand">FutureLabs Intelligence · Briefing</div>
  <div><div class="rule"></div><h1>${title}</h1><div class="meta">${byline.replace('@', '')}</div></div>
  <div class="meta">futurelabs.africa/research-labs<br>Not investment, legal or financial advice.</div>
</section>
${body}
</body></html>`;

writeFileSync(join(here, '.briefing.html'), html);

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `<div style="width:100%;font:7pt monospace;color:#8C887F;padding:0 18mm;display:flex;justify-content:space-between">
    <span>${title}</span><span class="pageNumber"></span></div>`,
  preferCSSPageSize: true,
});
await browser.close();
console.log('wrote', OUT);
