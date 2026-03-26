import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'devdex', 'note');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BASE_URL = 'https://devdex.dev';
const EMAIL = process.env.CAPTURE_DEVDEX_EMAIL || '';
const PASSWORD = process.env.CAPTURE_DEVDEX_PASSWORD || '';
const VIEWPORT = { width: 1440, height: 900 };

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  const guestPages = [
    { name: 'diagnosis-landing', path: '/diagnosis' },
    { name: 'interpersonal-landing', path: '/interpersonal' },
    { name: 'diagnosis-result', path: '/diagnosis/result/i-p-d-s' },
    { name: 'pricing', path: '/pricing' },
    { name: 'for-beginners', path: '/for-beginners' },
  ];

  for (const p of guestPages) {
    console.log(`📸 ${p.name}`);
    const ctx = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      colorScheme: 'dark',
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(3000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${p.name}.png`) });
    console.log(`  → ${p.name}.png ✓`);
    await ctx.close();
  }

  console.log('🔐 ログイン中...');
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await delay(2000);
  await page.locator('input[type="email"]').fill(EMAIL);
  await page.locator('input[type="password"]').fill(PASSWORD);
  await page.locator('button[type="submit"]', { hasText: 'ログイン' }).click();
  await page.waitForURL('**/', { timeout: 30000 }).catch(() => {});
  await delay(3000);
  for (const text of ['スキップ', '閉じる']) {
    const btn = page.locator('button', { hasText: text });
    if ((await btn.count()) > 0) await btn.click().catch(() => {});
    await delay(500);
  }

  const authedPages = [
    { name: 'dashboard', path: '/' },
    { name: 'combined-report', path: '/diagnosis/combined?eng=i-p-d-s&int=c-d-o-r' },
    { name: 'skillsheet', path: '/skillsheet' },
    { name: 'terms', path: '/terms' },
  ];

  for (const p of authedPages) {
    console.log(`📸 ${p.name}`);
    await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(3000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${p.name}.png`) });
    console.log(`  → ${p.name}.png ✓`);
  }

  // OGP画像
  console.log('📸 OGP画像');
  await page.goto(`${BASE_URL}/api/og/combined?eng=i-p-d-s&int=c-d-o-r`, { timeout: 30000 });
  await delay(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'ogp-combined.png') });
  console.log('  → ogp-combined.png ✓');

  await ctx.close();
  await browser.close();
  console.log(`\n✅ note用画像を ${OUTPUT_DIR} に保存しました`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
