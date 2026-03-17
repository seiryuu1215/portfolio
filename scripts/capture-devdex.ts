/**
 * DevDex 本番サイト スクリーンショット撮影スクリプト
 *
 * Usage:
 *   npx tsx scripts/capture-devdex.ts
 *
 * 出力先: public/images/devdex/
 * 前提: npm i -D playwright
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'devdex');

const BASE_URL = 'https://devdex.dev';
const LOGIN_EMAIL = 'mt.oikawa@gmail.com';
const LOGIN_PASSWORD = 'Seiryuu1215';

// Retina: deviceScaleFactor 2 で 1440x900 -> 2880x1800 の画像
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

// 追加待機時間（アニメーション完了用）
const EXTRA_WAIT_MS = 3000;

interface PageConfig {
  name: string;
  filename: string;
  path: string;
  waitSelector?: string;
  customAction?: (page: import('playwright').Page) => Promise<void>;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('Playwright ブラウザを起動中...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    colorScheme: 'dark',
  });

  const page = await context.newPage();

  // --- ログイン ---
  console.log('ログイン中...');
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await delay(2000);

  // メールアドレス入力
  const emailInput = page.locator('input[type="email"]');
  await emailInput.fill(LOGIN_EMAIL);

  // パスワード入力
  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.fill(LOGIN_PASSWORD);

  // ログインボタンをクリック
  const loginButton = page.locator('button[type="submit"]', { hasText: 'ログイン' });
  await loginButton.click();
  console.log('  ログインボタンクリック、遷移を待機中...');

  // ダッシュボードへの遷移を待つ
  await page.waitForURL('**/', { timeout: 30000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await delay(3000);
  console.log('  ログイン完了: ' + page.url());

  // --- 診断結果のtypeCodeを取得 ---
  // /diagnosis にアクセスして診断済みなら結果のtypeCodeリンクを探す
  // または /api/diagnosis/my-result 等で取得
  // 直接ページ内のリンクからtypeCodeを見つける
  let diagnosisTypeCode = '';

  // まずダッシュボードの診断結果リンクを探す
  const diagnosisLinks = await page.locator('a[href*="/diagnosis/result/"]').all();
  if (diagnosisLinks.length > 0) {
    const href = await diagnosisLinks[0].getAttribute('href');
    if (href) {
      const match = href.match(/\/diagnosis\/result\/([A-Z]+-[A-Z]+-[A-Z]+-[A-Z]+)/i);
      if (match) {
        diagnosisTypeCode = match[1];
        console.log(`  診断結果typeCode発見: ${diagnosisTypeCode}`);
      }
    }
  }

  // 見つからなければ/diagnosisページで探す
  if (!diagnosisTypeCode) {
    await page.goto(`${BASE_URL}/diagnosis`, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(3000);
    const resultLinks = await page.locator('a[href*="/diagnosis/result/"]').all();
    if (resultLinks.length > 0) {
      const href = await resultLinks[0].getAttribute('href');
      if (href) {
        const match = href.match(/\/diagnosis\/result\/([A-Za-z]+-[A-Za-z]+-[A-Za-z]+-[A-Za-z]+)/);
        if (match) {
          diagnosisTypeCode = match[1];
          console.log(`  診断結果typeCode発見（diagnosisページ）: ${diagnosisTypeCode}`);
        }
      }
    }
  }

  // それでも見つからなければURLからの遷移を試す
  if (!diagnosisTypeCode) {
    // /diagnosis ページでresult stepが表示されている場合、share URLを探す
    const shareLinks = await page.locator('a[href*="/diagnosis/result/"]').all();
    for (const link of shareLinks) {
      const href = await link.getAttribute('href');
      if (href) {
        const match = href.match(/result\/([^/\s?]+)/);
        if (match) {
          diagnosisTypeCode = match[1];
          break;
        }
      }
    }
  }

  // --- ログイン済みで撮影するページ ---
  const authedPages: PageConfig[] = [
    {
      name: 'ダッシュボード',
      filename: '01-dashboard-viewport.png',
      path: '/',
      // Rechartsのアニメーション完了を待つ
      waitSelector: '.recharts-wrapper',
    },
    {
      name: '用語一覧',
      filename: '02-terms-viewport.png',
      path: '/terms',
      waitSelector: 'table',
    },
    {
      name: '用語抽出',
      filename: '04-extract-viewport.png',
      path: '/extract',
      customAction: async (p) => {
        // 「用語を追加」タブをクリックしてテキスト入力フォームを表示
        const addTab = p.locator('button[role="tab"]', { hasText: '用語を追加' });
        await addTab.click();
        await delay(1000);
      },
    },
    {
      name: '料金プラン',
      filename: '05-pricing-viewport.png',
      path: '/pricing',
    },
  ];

  // 診断結果ページを追加（typeCodeが分かっている場合）
  if (diagnosisTypeCode) {
    authedPages.push({
      name: '診断結果',
      filename: '06-diagnosis-result-viewport.png',
      path: `/diagnosis/result/${diagnosisTypeCode}`,
      waitSelector: '.recharts-wrapper',
    });
  } else {
    console.warn('  警告: 診断結果のtypeCodeが見つかりませんでした。06番はスキップします。');
  }

  // --- ログイン済みページの撮影 ---
  for (const pageConfig of authedPages) {
    console.log(`撮影中: ${pageConfig.name} (${pageConfig.path})`);

    await page.goto(`${BASE_URL}${pageConfig.path}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // セレクタが指定されている場合は要素の出現を待つ
    if (pageConfig.waitSelector) {
      await page
        .waitForSelector(pageConfig.waitSelector, { timeout: 10000 })
        .catch(() => console.log(`  セレクタ待機タイムアウト: ${pageConfig.waitSelector}`));
    }

    // カスタムアクション
    if (pageConfig.customAction) {
      await pageConfig.customAction(page);
    }

    // アニメーション完了を待つ
    await delay(EXTRA_WAIT_MS);

    const filepath = path.join(OUTPUT_DIR, pageConfig.filename);
    await page.screenshot({ path: filepath, fullPage: false });
    console.log(`  -> ${pageConfig.filename} 保存完了`);
  }

  // --- 03: 診断ランディングページは未ログイン状態で撮影 ---
  // ログイン済みだと診断結果が表示されるため、別コンテキストで未認証アクセスする
  console.log('撮影中: エンジニアタイプ診断（未ログイン） (/diagnosis)');
  const guestContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    colorScheme: 'dark',
  });
  const guestPage = await guestContext.newPage();
  await guestPage.goto(`${BASE_URL}/diagnosis`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });
  await delay(EXTRA_WAIT_MS);
  await guestPage.screenshot({
    path: path.join(OUTPUT_DIR, '03-diagnosis-viewport.png'),
    fullPage: false,
  });
  console.log('  -> 03-diagnosis-viewport.png 保存完了');
  await guestContext.close();

  await browser.close();
  console.log(`\n完了! スクリーンショットは ${OUTPUT_DIR} に保存されました。`);
}

main().catch((err) => {
  console.error('エラー:', err);
  process.exit(1);
});
