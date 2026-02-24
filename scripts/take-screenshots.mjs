#!/usr/bin/env node
/**
 * darts Lab スクリーンショット撮影スクリプト（ポートフォリオ用）
 *
 * Usage:
 *   SCREENSHOT_EMAIL=xxx SCREENSHOT_PASSWORD=yyy node scripts/take-screenshots.mjs
 *   node scripts/take-screenshots.mjs home barrels   # 個別指定も可
 *
 * 出力先: public/screenshots/
 * 前提: npm i -D puppeteer
 */
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, '..', 'public', 'screenshots');
const BASE_URL = 'https://darts-app-lime.vercel.app';

const TEST_EMAIL = process.env.SCREENSHOT_EMAIL || '';
const TEST_PASSWORD = process.env.SCREENSHOT_PASSWORD || '';

const VIEWPORT = { width: 1280, height: 800 };

const PAGES = [
  { name: 'home', path: '/', caption: 'ダッシュボード' },
  { name: 'stats', path: '/stats', caption: 'スタッツ分析' },
  { name: 'barrels', path: '/barrels', caption: 'バレル検索' },
  { name: 'simulator', path: '/barrels/simulator', caption: 'バレルシミュレーター' },
  { name: 'shops', path: '/shops', caption: 'ショップ検索' },
  { name: 'setup', path: '/darts/new', caption: 'セッティング管理' },
  { name: 'reports', path: '/reports', caption: 'レポート' },
  { name: 'compare', path: '/darts/compare', caption: 'バレル比較' },
];

const targetPages = process.argv.slice(2);
const shouldCapture = (name) => targetPages.length === 0 || targetPages.includes(name);

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForContent(page, timeout = 15000) {
  try {
    await page.waitForNetworkIdle({ timeout, idleTime: 1000 });
  } catch {
    // timeout OK
  }
  await delay(1500);
}

async function clickButtonByText(page, ...texts) {
  try {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await btn.evaluate((el) => el.textContent?.trim());
      if (texts.some((t) => text === t || text?.includes(t))) {
        await btn.click();
        await delay(800);
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
}

async function dismissAllDialogs(page) {
  for (let i = 0; i < 5; i++) {
    const dismissed = await clickButtonByText(
      page,
      'あとで見る',
      'スキップ',
      'OK',
      'やったー!',
      '閉じる',
    );
    if (!dismissed) break;
    await delay(500);
  }
}

async function main() {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    console.error('環境変数 SCREENSHOT_EMAIL / SCREENSHOT_PASSWORD を設定してください');
    process.exit(1);
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // --- ログイン ---
  console.log('Logging in...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 30000 });
  await delay(2000);

  const emailInput = await page.$('input[type="email"], input[name="email"]');
  if (emailInput) {
    await emailInput.click({ clickCount: 3 });
    await emailInput.type(TEST_EMAIL, { delay: 30 });
  }

  const passwordInput = await page.$('input[type="password"], input[name="password"]');
  if (passwordInput) {
    await passwordInput.click({ clickCount: 3 });
    await passwordInput.type(TEST_PASSWORD, { delay: 30 });
  }

  const loginButton = await page.evaluateHandle(() => {
    const buttons = [...document.querySelectorAll('button')];
    return (
      buttons.find((b) => b.textContent?.includes('ログイン') && b.type !== 'button') ||
      buttons.find((b) => b.textContent?.includes('ログイン'))
    );
  });

  if (loginButton) {
    await loginButton.click();
    console.log('  Login button clicked, waiting...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    await delay(3000);
  }

  await dismissAllDialogs(page);
  await delay(1000);
  await dismissAllDialogs(page);

  // --- 各ページの撮影 ---
  for (const { name, path: pagePath } of PAGES) {
    if (!shouldCapture(name)) continue;

    console.log(`Taking screenshot: ${name}`);
    await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await waitForContent(page);
    await dismissAllDialogs(page);
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
