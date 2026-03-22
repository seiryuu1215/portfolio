#!/usr/bin/env npx tsx
/**
 * 汎用スクリーンショット撮影スクリプト
 *
 * Usage:
 *   npx tsx scripts/capture.ts              # 全サービス
 *   npx tsx scripts/capture.ts devdex       # DevDexだけ
 *   npx tsx scripts/capture.ts devdex 01-dashboard  # 特定ページだけ
 *
 * 前提: npm i -D playwright @playwright/test
 * 認証情報: .env.local に CAPTURE_DEVDEX_EMAIL / CAPTURE_DEVDEX_PASSWORD 等
 */
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { services, type ServiceConfig, type CaptureTarget } from './capture.config';

dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local'),
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const EXTRA_WAIT_MS = 3000;

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getOutputDir(service: ServiceConfig): string {
  return path.join(ROOT_DIR, 'public', 'images', service.outputDir);
}

/** ダイアログやモーダルを自動で閉じる */
async function dismissDialogs(page: Page, texts: string[]): Promise<void> {
  for (let i = 0; i < 5; i++) {
    let dismissed = false;
    for (const text of texts) {
      const btn = page.locator('button', { hasText: text }).first();
      if ((await btn.count()) > 0 && (await btn.isVisible())) {
        await btn.click().catch(() => {});
        dismissed = true;
        await delay(500);
        break;
      }
    }
    if (!dismissed) break;
  }
}

/** ログイン処理 */
async function login(page: Page, service: ServiceConfig): Promise<boolean> {
  const email = process.env[service.auth.emailEnvKey];
  const password = process.env[service.auth.passwordEnvKey];

  if (!email || !password) {
    console.error(
      `  ❌ 認証情報が未設定: ${service.auth.emailEnvKey} / ${service.auth.passwordEnvKey}`,
    );
    return false;
  }

  console.log(`  🔐 ログイン中...`);
  await page.goto(`${service.baseUrl}${service.auth.loginPath}`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });
  await delay(2000);

  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);

  const loginBtn = page.locator('button[type="submit"]', {
    hasText: service.auth.loginButtonText,
  });
  await loginBtn.click();

  await page.waitForURL(service.auth.redirectPattern, { timeout: 30000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await delay(3000);

  if (service.dismissTexts) {
    await dismissDialogs(page, service.dismissTexts);
  }

  console.log(`  ✅ ログイン完了: ${page.url()}`);
  return true;
}

/** 1ページ撮影 */
async function captureOne(
  page: Page,
  service: ServiceConfig,
  target: CaptureTarget,
  outputDir: string,
): Promise<void> {
  console.log(`  📸 ${target.name} (${target.path})`);

  await page.goto(`${service.baseUrl}${target.path}`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  if (target.waitSelector) {
    await page
      .waitForSelector(target.waitSelector, { timeout: 10000 })
      .catch(() => console.log(`    ⚠️ セレクタ待機タイムアウト: ${target.waitSelector}`));
  }

  if (target.customAction) {
    await target.customAction(page);
  }

  if (service.dismissTexts) {
    await dismissDialogs(page, service.dismissTexts);
  }

  await delay(EXTRA_WAIT_MS);

  const filepath = path.join(outputDir, `${target.name}.png`);
  await page.screenshot({ path: filepath, fullPage: target.fullPage ?? false });
  console.log(`    → ${target.name}.png ✓`);
}

/** 1サービス分の撮影 */
async function captureService(
  browser: Browser,
  service: ServiceConfig,
  targetFilter?: string,
): Promise<void> {
  console.log(`\n🚀 ${service.name} (${service.baseUrl})`);
  console.log(`${'─'.repeat(50)}`);

  const outputDir = getOutputDir(service);
  fs.mkdirSync(outputDir, { recursive: true });

  // 認証が必要なページ
  const authedTargets = service.captures.filter((t) => !t.noAuth);
  const guestTargets = service.captures.filter((t) => t.noAuth);

  // フィルタ適用
  const filterFn = (t: CaptureTarget) => !targetFilter || t.name.includes(targetFilter);

  // --- 認証済みコンテキスト ---
  if (authedTargets.filter(filterFn).length > 0) {
    const context = await browser.newContext({
      viewport: service.viewport,
      deviceScaleFactor: service.deviceScaleFactor,
      colorScheme: service.colorScheme,
    });
    const page = await context.newPage();

    const loggedIn = await login(page, service);
    if (!loggedIn) {
      console.error('  ログイン失敗、認証必須ページをスキップ');
    } else {
      for (const target of authedTargets.filter(filterFn)) {
        await captureOne(page, service, target, outputDir);
      }
    }

    await context.close();
  }

  // --- 未認証コンテキスト ---
  for (const target of guestTargets.filter(filterFn)) {
    const guestCtx = await browser.newContext({
      viewport: service.viewport,
      deviceScaleFactor: service.deviceScaleFactor,
      colorScheme: service.colorScheme,
    });
    const guestPage = await guestCtx.newPage();
    await captureOne(guestPage, service, target, outputDir);
    await guestCtx.close();
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const serviceFilter = args[0];
  const targetFilter = args[1];

  const targetServices = serviceFilter ? services.filter((s) => s.id === serviceFilter) : services;

  if (targetServices.length === 0) {
    console.error(`サービス "${serviceFilter}" が見つかりません`);
    console.error(`利用可能: ${services.map((s) => s.id).join(', ')}`);
    process.exit(1);
  }

  console.log('🖥️  ポートフォリオ用スクリーンショット撮影');
  console.log(`対象: ${targetServices.map((s) => s.name).join(', ')}`);

  const browser = await chromium.launch({ headless: true });

  for (const service of targetServices) {
    await captureService(browser, service, targetFilter);
  }

  await browser.close();

  console.log('\n✅ 完了! スクリーンショットは public/images/ に保存されました。');
}

main().catch((err) => {
  console.error('エラー:', err);
  process.exit(1);
});
