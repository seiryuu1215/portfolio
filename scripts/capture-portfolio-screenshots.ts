#!/usr/bin/env npx tsx
/**
 * Playwright スクリーンショット撮影スクリプト（ポートフォリオ用）
 *
 * Usage:
 *   npx tsx scripts/capture-portfolio-screenshots.ts
 *
 * 出力先: public/screenshots/
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, '..', 'public', 'screenshots');
const BASE_URL = 'https://darts-app-lime.vercel.app';

const EMAIL = 'demo-admin@darts-lab.example';
const PASSWORD = 'demo1234';

const PAGES = [
  { name: 'home', path: '/', caption: 'ダッシュボード' },
  { name: 'stats', path: '/stats', caption: 'スタッツ分析' },
  { name: 'calendar', path: '/stats/calendar', caption: 'プレイカレンダー' },
  { name: 'barrels', path: '/barrels', caption: 'バレル検索' },
  { name: 'simulator', path: '/barrels/simulator', caption: 'バレルシミュレーター' },
  { name: 'quiz', path: '/barrels/quiz', caption: 'バレル診断' },
  { name: 'recommend', path: '/barrels/recommend', caption: 'おすすめバレル' },
  { name: 'darts', path: '/darts', caption: 'マイダーツ' },
  { name: 'shops', path: '/shops', caption: 'マイショップ' },
  { name: 'discussions', path: '/discussions', caption: 'ディスカッション' },
  { name: 'health', path: '/health', caption: 'ヘルスダッシュボード' },
  { name: 'admin-users', path: '/admin/users', caption: '管理画面（ユーザー）' },
];

async function dismissDialogs(page: import('playwright').Page) {
  const dismissTexts = ['あとで見る', 'スキップ', 'OK', 'やったー!', '閉じる'];
  for (let i = 0; i < 5; i++) {
    let dismissed = false;
    for (const text of dismissTexts) {
      try {
        const btn = page.locator(`button:has-text("${text}")`).first();
        if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
          await btn.click({ timeout: 2000 });
          await page.waitForTimeout(800);
          dismissed = true;
          break;
        }
      } catch {
        // element may have been detached, continue
      }
    }
    if (!dismissed) break;
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  // --- ログイン ---
  console.log('Logging in...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.fill('input[type="email"], input[name="email"]', EMAIL);
  await page.fill('input[type="password"], input[name="password"]', PASSWORD);

  const loginBtn = page.locator('button', { hasText: 'ログイン' }).first();
  await loginBtn.click();
  console.log('  Login button clicked, waiting...');

  await page.waitForURL('**/', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await dismissDialogs(page);
  await page.waitForTimeout(1000);
  await dismissDialogs(page);

  // --- 各ページの撮影 ---
  for (const { name, path: pagePath, caption } of PAGES) {
    console.log(`Taking screenshot: ${name} (${caption})`);
    await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(4000);
    await dismissDialogs(page);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${name}.png`),
      fullPage: false,
    });
    console.log(`  -> ${name}.png saved`);
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to public/screenshots/');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
