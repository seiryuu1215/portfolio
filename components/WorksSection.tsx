'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from './SectionHeading';

interface ScaleItem {
  value: string;
  label: string;
}

interface Screenshot {
  src: string;
  caption: string;
  fit?: 'contain' | 'cover';
  lightBg?: boolean;
}

interface Work {
  title: string;
  period: string;
  description: string;
  motivation: string;
  differentiation: string[];
  techStack: string[];
  highlights: string[];
  features?: string[];
  scale?: ScaleItem[];
  url?: string;
  github?: string;
  blueprintUrl?: string;
  blueprintTabs?: string[];
  images?: Screenshot[];
  status?: 'released' | 'in-dev' | 'testing';
}

const WORKS: Work[] = [
  {
    title: 'darts Lab',
    period: '2025/12 〜 運用継続中',
    description:
      'ダーツプレイヤー向けのセッティング管理・スタッツ連携・バレル探索・コミュニティWebアプリ。DARTSLIVEアカウント連携でスタッツを自動取得し、ピアソン相関・線形回帰・スピード分析・ブル率シミュレーターなど多彩な統計分析で成長を可視化。iOS HealthKit連携で心拍・HRV・睡眠等のヘルスデータとダーツパフォーマンスの相関を分析。',
    motivation:
      '自身がダーツのプロ選手として活動してきた経験から、セッティング管理の煩雑さ・スタッツの可視化不足・バレル選びの情報分散といった課題を解決するために企画・開発。',
    differentiation: [
      '既存アプリはスタッツ閲覧のみ → 相関分析・回帰分析・スピード分析・ブル率シミュレーターなど統計的な深掘りが可能',
      'DARTSLIVEとPHOENIXは別会社・別アプリでデータ分断 → 1つのダッシュボードで統合閲覧',
      'バレル検索は「16〜18g」のような粗いフィルターのみ → 0.1g/0.1mm単位のスライダー指定 + 独自レコメンドエンジン',
      'マイショップは1店舗のみ・禁煙/路線検索なし → 複数ブックマーク + 禁煙/分煙フィルター + 路線検索 + 訪問済み/未訪問管理',
      'セッティング比較は感覚だより → 0.1mm/0.1g単位でパーツごとに定量比較',
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'MUI v7',
      'Recharts',
      'Firebase',
      'Stripe',
      'Serwist (PWA)',
      'Capacitor',
      'Vercel',
      'Vitest',
      'GitHub Actions',
      'Sentry',
      'LINE Messaging API',
      'HealthKit (Swift)',
      'next-intl',
      'react-joyride',
      'Puppeteer (PDF)',
    ],
    highlights: [
      'フルサーバーレス構成 — フロント〜認証・課金〜インフラまで全工程を一人で完遂',
      'AI駆動開発 — Claude Code SubAgents 5体制で設計〜テストを自動化。3プロジェクト間の数値同期・開発日記の自動生成・ツール呼び出しログの定量分析まで仕組み化',
      '3段階SaaSモデル（一般/Pro/管理者）— Stripe Subscription + NextAuth + Firebase Auth のロールベース制御',
      '統計分析エンジン — ピアソン相関・線形回帰・スピード分析(アダプティブ刻み幅+ミス方向検出)・ブル率改善シミュレーター・DL3レンジ推移分析',
      'DARTSLIVE API + Puppeteer + Vercel Cron（毎日JST 10:00）でスタッツを自動収集。スクレイピング→API移行でフル同期+差分同期の2モード対応',
      'DL3フルビットセンサーデータ活用 — レンジ(グルーピング半径)推移・レーティング別ベンチマーク比較・LINE通知での前回比較値表示',
      'LINE Bot高度化 — ロール別カルーセル通知（7種Flex Bubble）・リッチメニュー2×3・オンデマンド分析/トレンドコマンド。月200プッシュの無料枠内で最大限の価値を提供',
      'セキュリティレビュー実施（A+評価）— CRITICAL 2件・HIGH 7件・MEDIUM 8件を修正。CSP nonce方式統一・XP操作ホワイトリスト制限・Firestoreフィールド制限・レートリミット(60req/min)・SSRF対策・CSV Injection対策',
      'iOS HealthKit 連携 — Swift Capacitor プラグインで心拍/HRV/睡眠/歩数等10種のメトリクスを取得。ピアソン相関でカウントアップ平均スコアとの関連を分析し「HRV高い日はCU平均+15」等のインサイトを自動生成。HealthKit → Capacitor Bridge → Firestore → Next.js API → Recharts のフルスタックデータパイプライン',
      '661テスト（Vitest 459 + Storybook 173 + Playwright E2E 29シナリオ）— 3層テスト戦略で品質を担保',
      'スタッツカード31枚にErrorBoundary適用 — 1カードのエラーが他に波及しない堅牢設計',
    ],
    features: [
      'DARTSLIVEスタッツ自動取得 — ピアソン相関・線形回帰・スピード分析・ブル率シミュレーター・レンジ推移分析',
      '64コンポーネントの統計ダッシュボード — Rating推移・スキルレーダー・ヒートマップ・レンジ推移・プレイヤーDNA',
      '7,000種バレルDB — 実寸SVGシミュレーター・100点スコアリング・診断クイズ・レコメンドエンジン',
      'セッティング管理 — 登録・比較（差分カラー）・履歴・いいね/コメント・OGP付きシェア',
      'XP/ランクシステム（21種ルール・50段階）・12種アワード・ゴールトラッキング・練習の意識ポイント',
      'マイショップ管理 — Leafletマップ・路線フィルター・DARTSLIVE URL自動取得',
      'ディスカッション掲示板（6カテゴリ）・記事投稿（Markdown）',
      'LINE Bot — ロール別カルーセル通知（7種Flex Bubble）・リッチメニュー6ボタン・オンデマンド分析/トレンドコマンド・週次/月次レポート',
      'アフィリエイト連携（ダーツハイブ・楽天・Amazon）— 商品直リンク+検索で購入導線を提供',
      'HealthKit連携 — Apple Watch/iPhoneヘルスデータ取得・ヘルスダッシュボード・ダーツ×ヘルス相関分析',
      'PWA（オフラインキャッシュ）・Capacitor iOS対応・ダークモード',
      'i18n（日本語/英語）— next-intl によるクッキーベース多言語切替',
      'インタラクティブオンボーディングツアー — react-joyride で実際のUIをハイライトしながらステップ案内',
      '月次PDFレポート — Puppeteer サーバーサイド生成。スタッツ・アワード集計をA4レポートとしてエクスポート',
      'リッチカレンダー — 20+フィールド表示・アワードバッジ・セクション別詳細パネル',
      'デモアカウント — 3ロール（一般/Pro/管理者）の体験環境。多層書き込み制限 + 日次自動リセット',
      'ダークモード — OS連動 + 手動切替。FOUC防止のスクリプト注入',
      'ヘルスチェックAPI — Firestore + Redis の死活監視エンドポイント',
    ],
    scale: [
      { value: '320+', label: 'コミット' },
      { value: '42', label: 'API routes' },
      { value: '40', label: 'ページ' },
      { value: '144', label: 'コンポーネント' },
      { value: '90,000+', label: '行（TS）' },
      { value: '7,000+', label: 'バレルDB' },
      { value: '661', label: 'テスト' },
      { value: '173', label: 'Storybook' },
      { value: '16', label: '設計書' },
    ],
    images: [
      { src: '/home.png', caption: 'ダッシュボード', fit: 'cover' },
      { src: '/countup.png', caption: 'COUNT-UP 深掘り分析', fit: 'contain' },
      { src: '/heatmap.png', caption: 'ダーツボードヒートマップ', fit: 'contain' },
      { src: '/barrel-quiz.png', caption: 'バレル診断クイズ', fit: 'contain' },
      { src: '/setting-compare.png', caption: 'セッティング比較', fit: 'contain' },
      { src: '/barrel-recommend.jpeg', caption: 'おすすめバレル探索', fit: 'contain' },
      { src: '/screenshots/simulator.png', caption: 'レーティングシミュレーター', fit: 'contain' },
      {
        src: '/screenshots/recommendations.png',
        caption: 'AI練習レコメンド',
        fit: 'contain',
      },
      { src: '/screenshots/sensor.png', caption: 'DL3センサー分析', fit: 'contain' },
    ],
    url: 'https://darts-app-lime.vercel.app',
    github: 'https://github.com/seiryuu1215/darts-app',
    blueprintUrl: '/projects/darts-lab',
    blueprintTabs: [
      '📐 アーキテクチャ',
      '🗄️ ER図',
      '🔐 認証・課金',
      '⏰ Cronバッチ',
      '📱 画面遷移',
      '🔄 API・データフロー',
      '📋 要件・ペルソナ',
    ],
    status: 'released',
  },
  {
    title: 'SaaS Launcher — スターターキット販売',
    period: '2026/3 〜 販売中',
    description:
      'darts Labから認証・決済・セキュリティ基盤を抽出した日本語圏初のNext.js SaaSスターターキット。¥2,980で販売中。',
    motivation:
      'SaaS開発のたびに認証・決済・セキュリティで同じ実装を繰り返す課題を解決。英語圏にはShipFast ($199)、Makerkit ($299) 等があるが日本語対応は皆無だったため、自身の運用実績あるコードを汎用化して販売。',
    differentiation: [
      '英語圏のみの市場（ShipFast $199, Makerkit $299）→ 日本語コード・日本語ドキュメントで唯一の選択肢',
      'テンプレートは「動くだけ」→ 本番運用1年で踏んだ地雷を全て回避済みのコード',
      'Stripe連携の手動セットアップが面倒 → setup-stripe.mjs で商品・価格を自動作成',
    ],
    techStack: [
      'Next.js 16',
      'TypeScript',
      'shadcn/ui',
      'Tailwind CSS v4',
      'Firebase',
      'Stripe',
      'NextAuth',
      'Vitest',
      'Serwist (PWA)',
      'Sentry',
      'Vercel',
      'Lemon Squeezy',
    ],
    highlights: [
      'darts Lab から認証（NextAuth + Firebase Auth REST API）・決済（Stripe Checkout/Portal/Webhook）・RBAC（3段階ロール）を抽出・汎用化',
      'API ミドルウェアを関数合成パターンで設計 — withErrorHandler / withAuth / withAdmin / withPermission の4デコレータ',
      'Stripe Webhook の冪等性チェック（stripeEvents コレクション）・プロモ価格・トライアル対応',
      '実運用で発見した5つの地雷を回避済み — Firebase SDK の Node.js 互換性、Vercel 環境変数の改行問題、Next.js patched fetch 等',
      'Lemon Squeezy で販売フロー構築 — ZIP配布・決済・デリバリーを自動化',
    ],
    features: [
      '認証: NextAuth + Firebase Auth（JWT・ロール同期）',
      '決済: Stripe サブスクリプション（Checkout・Portal・Webhook 4イベント）',
      'RBAC: admin / pro / general の3段階権限管理',
      'セキュリティ: CSP・レートリミット（Upstash Redis）・Firestore保護フィールド',
      'PWA: Serwist Service Worker（オフライン・プッシュ通知）',
      'CI/CD: GitHub Actions 4段階ゲート（Lint→Format→Test→Build）',
      'テスト: Vitest 22テスト即実行可能',
      '自動化: setup-stripe.mjs で Stripe 商品・価格を一発作成',
    ],
    scale: [
      { value: '22', label: 'テスト' },
      { value: '89', label: 'ファイル' },
      { value: '4段階', label: 'CI/CD' },
      { value: '10+', label: '連携サービス' },
      { value: '¥2,980', label: '販売価格' },
      { value: '164KB', label: 'ZIP配布' },
    ],
    images: [
      {
        src: '/images/saas-launcher/pricing.png',
        caption: '料金プラン比較',
        fit: 'contain',
      },
      {
        src: '/images/saas-launcher/login.png',
        caption: 'ログイン画面',
        fit: 'contain',
      },
    ],
    url: 'https://saas-launcher.vercel.app',
    github: 'https://github.com/seiryuu1215/saas-launcher',
    blueprintUrl: '/projects/saas-launcher',
    blueprintTabs: [
      '📐 アーキテクチャ',
      '🔐 認証フロー',
      '💳 決済フロー',
      '🛡️ RBAC',
      '🔧 ミドルウェア',
    ],
    status: 'released',
  },
  {
    title: 'next-api-composer — OSS npm パッケージ',
    period: '2026/3 〜 公開中',
    description:
      'Next.js App Router Route Handler向けのミドルウェア合成ライブラリ。compose()で認証・レートリミット・バリデーションを型安全に合成。ESM+CJS対応、ゼロ外部依存。',
    motivation:
      'Next.js App Router の Route Handler にはミドルウェア合成の仕組みがなく、認証・レートリミット・バリデーションのボイラープレートを毎回書く必要がある。next-connect は3年放置、next-safe-action は Server Actions 専用で、Route Handler 向けの合成ライブラリが市場に存在しなかったため開発・公開。',
    differentiation: [
      'next-connect は3年メンテ放置＆Pages Router 時代の設計 → App Router Route Handler にネイティブ対応',
      'next-safe-action は Server Actions 専用 → Route Handler（GET/POST/PUT/DELETE）に特化',
      'ミドルウェアごとにコンテキスト型が積み上がる型安全な compose() を提供 → TypeScript の型推論でコンテキストが自動伝播',
    ],
    techStack: ['TypeScript', 'Next.js', 'Vitest', 'tsup', 'GitHub Actions', 'npm'],
    highlights: [
      'darts Lab の withErrorHandler / withAuth / withAdmin / withPermission を AuthAdapter パターンで抽象化 — NextAuth・Clerk・Supabase の3プロバイダ対応',
      'reduceRight ベースの compose() でミドルウェアを関数合成 — 左が外側（先に実行）の直感的な順序',
      'Zod スキーマで body / query を検証する withValidation — validated コンテキストを型安全に注入',
      'in-memory レートリミットで外部依存ゼロ — Upstash Redis 等への依存を排除しポータビリティを確保',
      'ESM + CJS デュアルビルド（tsup）— パッケージサイズ 13.6KB、ゼロランタイム依存',
    ],
    features: [
      'compose() — 複数ミドルウェアの型安全な合成',
      'withErrorHandler — try/catch + onError コールバック',
      'withAuth — AuthAdapter による認証抽象化',
      'withRateLimit — in-memory レートリミッタ',
      'withValidation — Zod body/query バリデーション',
      'withPermission — ロールベースのアクセス制御',
      'NextAuth / Clerk / Supabase アダプタ',
      'ESM + CJS デュアルビルド対応',
    ],
    scale: [
      { value: '33', label: 'テスト' },
      { value: '13.6KB', label: 'パッケージ' },
      { value: '0', label: '外部依存' },
      { value: '3', label: '認証アダプタ' },
    ],
    images: [
      {
        src: '/images/next-api-composer/compose-example.svg',
        caption: 'compose() API — ミドルウェア合成の使用例',
        fit: 'contain',
      },
    ],
    url: 'https://www.npmjs.com/package/next-api-composer',
    github: 'https://github.com/seiryuu1215/next-api-composer',
    status: 'released',
  },
  {
    title: 'MonkMode — 筋トレ・食事管理',
    period: '2026/2 〜 開発中',
    description:
      '筋トレ・食事管理アプリ。Supabase + Dexie.jsでオフラインファースト設計。ダーツ練習日を保護する適応型スケジューラーで両立を実現。',
    motivation:
      'ダーツの練習日と筋肉痛の管理を両立したいという自身の課題が起点。既存アプリは機能過多で続かないため、あえて機能を絞った「修行僧」テーマで差別化し、ストイックに続けられる仕組みを追求。',
    differentiation: [
      '既存の筋トレアプリは機能過多で継続率が低い → あえて機能を絞り「続けること」に特化',
      'ダーツ練習日と筋トレの両立を考慮したアプリが存在しない → 適応型スケジューラーで自動調整',
      'オフライン対応の筋トレアプリが少ない → Dexie.js でオフラインファースト設計、ジムでも使える',
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Supabase (PostgreSQL)',
      'shadcn/ui',
      'Tailwind CSS v4',
      'Dexie.js (IndexedDB)',
      'Serwist (PWA)',
      'Capacitor',
      'Vercel',
      'Vitest',
      'GitHub Actions',
    ],
    highlights: [
      'Supabase（PostgreSQL + RLS）で認証・DB・ストレージを統合 — 1作目のFirebaseとは異なるBaaSで技術幅を拡大',
      'Dexie.js によるオフラインファースト設計 — IndexedDBでローカル保存し、オンライン復帰時にSupabaseへ同期',
      'lib/engine/ に10ファイルのビジネスロジックを集約 — UIとロジックを完全分離',
      '13個のServer Actionsで型安全なデータ操作を実現',
    ],
    features: [
      '適応型トレーニングスケジューラー（ダーツ練習日を自動保護）',
      '修行僧テーマの段位システム（28段位・修行の木）',
      'FatSecret API連携の日本語食品検索・3段階の食事管理レベル（入門/修行/苦行）',
      'PWA（Serwist）・Capacitor iOS対応・オフライン対応',
    ],
    images: [{ src: '/monkmode-home.png', caption: 'ホーム画面', fit: 'contain' }],
    github: 'https://github.com/seiryuu1215/training-app',
    status: 'in-dev',
  },
  {
    title: 'DevDex — IT用語理解度管理ツール',
    period: '2026/3（76時間で構築）〜 運用中',
    description:
      'IT用語の理解度を蓄積・育てていく個人開発ツール。用語登録→AI概要補完→習熟度スコアリング→レーダーチャート可視化のサイクルで「エンジニアの内面」をデータ化。長文貼り付けからの用語一括抽出、エンジニアタイプ診断、スキルシート管理、公開プロフィールURL生成まで備える。',
    motivation:
      '面談前に「自分がどの技術をどこまで理解しているか」を整理する手段がなく、毎回ゼロから準備していた課題を解決。スキルシートが「外面」なら、このアプリは「内面」を可視化するツールとして企画。Claude Code SubAgentsによるAI駆動開発の実践プロジェクトでもある。',
    differentiation: [
      '既存のスキル管理は自己申告の箇条書きのみ → 1〜5段階の習熟度スコア + カテゴリ別レーダーチャートで定量的に可視化',
      '用語の概要を毎回手書き → Anthropic API でワンクリックAI補完。長文貼り付けからの一括抽出にも対応',
      '技術スタックの棚卸しに特化したツールが存在しない → 用語登録・親子関係・関連用語・ピン留め・ウォッチで構造的に管理',
      'エンジニアタイプ診断（4軸×16タイプ + 対人スタイル4タイプ）でスキル傾向を客観的に把握。登録不要で診断 → SNSシェアで集客導線を設計',
      'Free/Pro/Enterprise の3層課金 + 組織機能で toC・toB 両方に対応。Stripe連携でサブスクリプション決済',
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase (PostgreSQL + Auth + RLS)',
      'shadcn/ui',
      'Tailwind CSS v4',
      'Anthropic API (Claude)',
      'Recharts',
      'Vitest',
      'Playwright',
      'Vercel',
      'GitHub Actions',
    ],
    highlights: [
      'AI駆動開発 — Claude Code SubAgents 6体制（PM/実装/テスト/レビュー/日記/ビジネス）で設計〜テスト〜収益化分析を自動化。意思決定記録・開発日記の自動生成まで仕組み化',
      'Server Component + Client Component のハイブリッド設計 — データフェッチをサーバー側に集約し、APIラウンドトリップを排除。Recharts は dynamic import (ssr: false) で遅延読み込み',
      'Supabase RLS（Row Level Security）による多層アクセス制御 — 全テーブルにRLSポリシーを適用。公開プロフィールは service_role キーで読み取り',
      'Anthropic API 連携 — 用語概要のAI補完、長文からの用語一括抽出、AI面談シミュレーター、AI学習プラン生成。利用上限を Free/Pro で差別化',
      'エンジニアタイプ診断 — 64問の質問から4軸×16タイプに分類。スコア + タイプ別キャラクター + 詳細レポート + 対人スタイル診断。SNSシェアで集客導線を設計',
      'スキルシート管理 — 案件・担当工程・使用技術を登録し、Excel/PDF出力・Excelインポート（AI構造解析）・公開URL・面談準備リストとして活用',
      '2,063テスト（Vitest + Playwright E2E）— ユニット145ファイル + E2Eシナリオで品質を担保。CI/CDでlint/test/buildを自動実行',
      '3段階ロールモデル（user/pro/admin）+ 組織ロール — Feature Gate パターンでPro機能を制御。Stripe連携でサブスクリプション課金',
    ],
    features: [
      '用語CRUD — 登録・編集・削除 + カテゴリフィルター・習熟度ソート・検索',
      'AI概要補完 — Anthropic API で用語名から概要を自動生成（Free 10回/日, Pro 50回/日）',
      '長文用語抽出 — テキスト貼り付けからIT用語を一括抽出・登録',
      'ダッシュボード — レベル・キャラクター・統計カード・カテゴリ別レーダーチャート・ピン留め/ウォッチ一覧',
      'エンジニアタイプ診断 — 64問→4軸×16タイプ分類 + 対人スタイル診断 + おすすめ技術レコメンド',
      'スキルシート — 案件管理・担当工程・使用技術・PDF出力',
      '公開プロフィール — /:username でキャラ・レーダーチャート・ピン留め用語を公開',
      '面談準備リスト — 用語にフラグを付けて面談前の確認リストを作成',
      '親子関係・関連用語 — 用語間のリンクで知識の構造を表現',
      'ゲーム要素 — 習熟度累積でレベルアップ + キャラクター成長',
    ],
    scale: [
      { value: '520+', label: 'マージ済みPR' },
      { value: '63', label: 'API routes' },
      { value: '33', label: 'ページ' },
      { value: '109', label: 'コンポーネント' },
      { value: '44,000+', label: '行（TS）' },
      { value: '2,063', label: 'テスト' },
      { value: '34', label: 'マイグレーション' },
      { value: '456', label: 'TSファイル' },
    ],
    images: [
      {
        src: '/images/devdex/01-dashboard-viewport.png',
        caption: 'ダッシュボード',
        fit: 'cover',
      },
      {
        src: '/images/devdex/02-terms-viewport.png',
        caption: '用語一覧',
        fit: 'cover',
      },
      {
        src: '/images/devdex/03-diagnosis-viewport.png',
        caption: 'エンジニアタイプ診断',
        fit: 'cover',
      },
      {
        src: '/images/devdex/04-extract-viewport.png',
        caption: '用語抽出',
        fit: 'cover',
      },
      {
        src: '/images/devdex/05-pricing-viewport.png',
        caption: '料金プラン',
        fit: 'cover',
      },
      {
        src: '/images/devdex/06-diagnosis-result-viewport.png',
        caption: '診断結果シェア（OGP対応）',
        fit: 'cover',
      },
    ],
    url: 'https://devdex.dev',
    github: 'https://github.com/seiryuu1215/devdex',
    blueprintUrl: '/projects/devdex',
    blueprintTabs: [
      '📐 アーキテクチャ',
      '🗄️ ER図',
      '🔐 認証・RLS',
      '🔄 API・データフロー',
      '📱 画面遷移',
      '🤖 AI統合フロー',
      '📋 要件・ペルソナ',
    ],
    status: 'released',
  },
];

function ImageGallery({ images }: { images: Screenshot[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <div className="space-y-2" onKeyDown={handleKeyDown}>
      <div className="rounded-xl bg-card border border-border overflow-hidden bg-[#1a1a1a] relative group">
        <Image
          src={images[current].src}
          alt={images[current].caption}
          width={800}
          height={480}
          className={`w-full max-h-[480px] ${
            images[current].fit === 'contain'
              ? 'h-auto object-contain mx-auto'
              : 'h-[280px] sm:h-[420px] object-cover object-top'
          } ${images[current].lightBg ? 'brightness-[.85] contrast-[.95]' : ''}`}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="前の画像"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="次の画像"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
      <p className="text-xs text-center text-muted">
        {images[current].caption}
        {images.length > 1 && (
          <span className="ml-1 text-muted/50">
            ({current + 1}/{images.length})
          </span>
        )}
      </p>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => setCurrent(idx)}
              aria-label={`${img.caption}を表示`}
              className={`shrink-0 w-16 h-10 rounded-md border overflow-hidden transition-all ${
                idx === current
                  ? 'border-accent ring-1 ring-accent/30'
                  : 'border-border opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                width={64}
                height={40}
                className={`w-full h-full object-cover ${img.lightBg ? 'brightness-[.85]' : ''}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const RICH_PROJECTS = new Set(['darts Lab', 'DevDex — IT用語理解度管理ツール']);

export default function WorksSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="personal" label="Personal Projects" title="個人開発" />

        <div className="space-y-16">
          {WORKS.filter((w) => RICH_PROJECTS.has(w.title)).map((work) => (
            <div
              key={work.title}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              {/* ヘッダー */}
              <div className="p-5 pb-0 flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold">{work.title}</h3>
                {work.status === 'released' && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                    {work.url?.includes('npmjs.com') ? '公開中' : '運用中'}
                  </span>
                )}
                <span className="text-xs text-muted ml-auto">{work.period}</span>
              </div>

              {/* メインコンテンツ: 画像sticky + 詳細 */}
              <div className="grid md:grid-cols-5 gap-6 p-5">
                {/* 画像（sticky） */}
                <div className="md:col-span-2">
                  <div className="md:sticky md:top-20">
                    {work.images && work.images.length > 0 ? (
                      <ImageGallery images={work.images} />
                    ) : (
                      <div className="aspect-video rounded-xl bg-background border border-border flex items-center justify-center text-muted">
                        <span className="text-sm">スクリーンショットを配置</span>
                      </div>
                    )}
                    {/* リンク */}
                    <div className="flex gap-4 mt-3">
                      {work.url && (
                        <a
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          サイトを見る
                        </a>
                      )}
                      {work.github && (
                        <a
                          href={work.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>

                    {/* 設計図バナー */}
                    {work.blueprintUrl && (
                      <Link
                        href={work.blueprintUrl}
                        className="block mt-4 group/bp rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all p-3.5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-accent">
                            インタラクティブ設計図
                          </span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-accent group-hover/bp:translate-x-0.5 transition-transform"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(work.blueprintTabs || []).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent/80 border border-accent/15"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </Link>
                    )}
                  </div>
                </div>

                {/* 詳細 */}
                <div className="md:col-span-3 space-y-4">
                  <p className="text-muted leading-relaxed text-sm">{work.description}</p>

                  {/* 動機 */}
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-xs text-accent font-medium mb-1">なぜ作ったか</p>
                    <p className="text-xs text-muted leading-relaxed">{work.motivation}</p>
                  </div>

                  {/* 差別化 */}
                  {work.differentiation && (
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-xs text-accent font-medium mb-1.5">
                        既存サービスとの差別化
                      </p>
                      <ul className="space-y-1">
                        {work.differentiation.map((d) => (
                          <li key={d} className="text-xs text-muted flex items-start gap-1.5">
                            <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 設計・技術のポイント */}
                  <div>
                    <p className="text-sm font-medium mb-2">設計・技術のポイント</p>
                    <ul className="space-y-1">
                      {work.highlights.map((h) => (
                        <li key={h} className="text-xs text-muted flex items-start gap-1.5">
                          <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 主な機能 */}
                  {work.features && (
                    <div>
                      <p className="text-sm font-medium mb-2">主な機能</p>
                      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                        {work.features.map((f) => (
                          <div key={f} className="text-xs text-muted flex items-start gap-1.5">
                            <span className="text-accent/60 mt-0.5 shrink-0">&#9656;</span>
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 規模 + タグ */}
                  {work.scale && (
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
                      {work.scale.map((s) => (
                        <div
                          key={s.label}
                          className="text-center px-1 py-1.5 sm:px-2 rounded-lg bg-background border border-border"
                        >
                          <div className="text-xs font-bold text-accent">{s.value}</div>
                          <div className="text-[10px] text-muted">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {work.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 技術発信 */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 pb-0 flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-bold">AI駆動開発の知見を発信</h3>
              <span className="text-xs text-muted ml-auto">Zenn</span>
            </div>

            <div className="p-5 space-y-5">
              {/* 本 — ヒーローカード */}
              <a
                href="https://zenn.dev/seiryuuu_dev/books/claude-code-darts-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-all group"
              >
                <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-6">
                  <p className="text-[10px] tracking-widest text-blue-300/60 uppercase mb-3">
                    Zenn Book — 全10章
                  </p>
                  <p className="text-lg font-bold text-white leading-snug group-hover:text-blue-200 transition-colors">
                    AI × 個人開発で
                    <br />
                    90,000行のSaaSを作った方法
                  </p>
                  <p className="text-xs text-blue-200/50 mt-3">
                    Claude Codeとの3ヶ月 — 企画・設計・実装・テスト・セキュリティの全記録
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {[
                      { value: '10', label: '章' },
                      { value: '90,000+', label: '行' },
                      { value: '661', label: 'テスト' },
                      { value: 'A+', label: 'セキュリティ' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-sm font-bold text-blue-300">{s.value}</div>
                        <div className="text-[10px] text-blue-300/40">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-2.5 bg-card flex items-center justify-between">
                  <span className="text-xs text-muted">読む</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </a>

              {/* 記事一覧（2シリーズ横並び） */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted mb-2">
                    設計図×コードで読み解くサービス連携
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { emoji: '🔐', title: 'デュアル認証', slug: 'darts-lab-dual-auth' },
                      { emoji: '💳', title: 'Stripe課金フロー', slug: 'darts-lab-stripe-flow' },
                      { emoji: '⏰', title: 'Cronバッチ', slug: 'darts-lab-cron-pipeline' },
                      {
                        emoji: '🤖',
                        title: 'LINE Bot状態遷移',
                        slug: 'darts-lab-line-statemachine',
                      },
                      { emoji: '🛡️', title: '多層防御', slug: 'darts-lab-defense-layers' },
                    ].map((article) => (
                      <a
                        key={article.slug}
                        href={`https://zenn.dev/seiryuuu_dev/articles/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all text-xs text-muted hover:text-foreground"
                      >
                        <span>{article.emoji}</span>
                        <span>{article.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted mb-2">IT初心者でもわかるシリーズ</p>
                  <div className="space-y-1.5">
                    {[
                      { emoji: '🏗️', title: 'アーキテクチャ', slug: 'darts-lab-architecture' },
                      { emoji: '🗄️', title: 'NoSQL設計', slug: 'darts-lab-firestore' },
                      { emoji: '🔐', title: '認証・JWT', slug: 'darts-lab-auth' },
                      { emoji: '💳', title: 'Stripe決済', slug: 'darts-lab-stripe' },
                      { emoji: '🤖', title: 'Cron・LINE Bot', slug: 'darts-lab-cron-line' },
                      { emoji: '🔄', title: 'API設計', slug: 'darts-lab-api' },
                      { emoji: '📋', title: '要件定義', slug: 'darts-lab-requirements' },
                    ].map((article) => (
                      <a
                        key={article.slug}
                        href={`https://zenn.dev/seiryuuu_dev/articles/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all text-xs text-muted hover:text-foreground"
                      >
                        <span>{article.emoji}</span>
                        <span>{article.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted mb-2">SaaS スターターキット</p>
                  <div className="space-y-1.5">
                    {[{ emoji: '🚀', title: 'SaaS Launcher 公開', slug: 'saas-launcher' }].map(
                      (article) => (
                        <a
                          key={article.slug}
                          href={`https://zenn.dev/seiryuuu_dev/articles/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all text-xs text-muted hover:text-foreground"
                        >
                          <span>{article.emoji}</span>
                          <span>{article.title}</span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* サブプロジェクト＋開発中（コンパクト表示） */}
          <div className="space-y-3">
            {WORKS.filter((w) => !RICH_PROJECTS.has(w.title)).map((work) => (
              <div key={work.title} className="p-4 rounded-xl border border-border/60 bg-card/50">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold">{work.title}</h4>
                  {work.status === 'released' ? (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                      {work.url?.includes('npmjs.com') ? '公開中' : '運用中'}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium">
                      開発中
                    </span>
                  )}
                  <span className="text-xs text-muted ml-auto">{work.period}</span>
                </div>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">{work.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {work.techStack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-card border border-border text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {work.url && (
                      <a
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        サイト
                      </a>
                    )}
                    {work.github && (
                      <a
                        href={work.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
