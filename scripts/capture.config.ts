/**
 * ポートフォリオ用スクリーンショット撮影設定
 *
 * 各サービスのログイン情報・撮影ページ・出力先を定義
 * 認証情報は .env.local から読み込む
 */

import type { Page } from 'playwright';

export interface CaptureTarget {
  /** ファイル名（拡張子なし） */
  name: string;
  /** パス */
  path: string;
  /** 要素の出現を待つセレクタ */
  waitSelector?: string;
  /** 撮影前のカスタム操作 */
  customAction?: (page: Page) => Promise<void>;
  /** 未ログイン状態で撮影 */
  noAuth?: boolean;
  /** フルページキャプチャ */
  fullPage?: boolean;
}

export interface ServiceConfig {
  /** サービス識別子 */
  id: string;
  /** サービス名 */
  name: string;
  /** 本番URL */
  baseUrl: string;
  /** ログイン情報（環境変数キー） */
  auth: {
    emailEnvKey: string;
    passwordEnvKey: string;
    loginPath: string;
    /** ログインボタンのテキスト */
    loginButtonText: string;
    /** ログイン後のリダイレクト先（待機用） */
    redirectPattern: string;
  };
  /** 出力ディレクトリ（public/images/ 以下） */
  outputDir: string;
  /** ビューポート */
  viewport: { width: number; height: number };
  /** デバイススケールファクター */
  deviceScaleFactor: number;
  /** カラースキーム */
  colorScheme: 'dark' | 'light';
  /** 撮影ページ一覧 */
  captures: CaptureTarget[];
  /** ダイアログ等の自動閉じテキスト */
  dismissTexts?: string[];
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const services: ServiceConfig[] = [
  {
    id: 'devdex',
    name: 'DevDex',
    baseUrl: 'https://devdex.dev',
    auth: {
      emailEnvKey: 'CAPTURE_DEVDEX_EMAIL',
      passwordEnvKey: 'CAPTURE_DEVDEX_PASSWORD',
      loginPath: '/auth/login',
      loginButtonText: 'ログイン',
      redirectPattern: '**/',
    },
    outputDir: 'devdex',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
    dismissTexts: ['スキップ', '閉じる'],
    captures: [
      {
        name: '01-dashboard',
        path: '/',
        waitSelector: '.recharts-wrapper',
      },
      {
        name: '02-terms',
        path: '/terms',
        waitSelector: 'table',
      },
      {
        name: '03-diagnosis',
        path: '/diagnosis',
        noAuth: true,
      },
      {
        name: '04-extract',
        path: '/extract',
        customAction: async (page) => {
          const tab = page.locator('button[role="tab"]', { hasText: '用語を追加' });
          if ((await tab.count()) > 0) {
            await tab.click();
            await delay(1000);
          }
        },
      },
      {
        name: '05-pricing',
        path: '/pricing',
      },
      {
        name: '06-diagnosis-result',
        path: '/diagnosis/result/i-p-d-s',
        waitSelector: '.recharts-wrapper',
      },
      {
        name: '07-skillsheet',
        path: '/skillsheet',
      },
      {
        name: '08-combined-report',
        path: '/diagnosis/combined?eng=i-p-d-s&int=c-d-o-r',
      },
    ],
  },
];
