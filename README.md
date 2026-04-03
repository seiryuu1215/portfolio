[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-27_tests-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://portfolio-seiryuu.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

# Seiryuu Portfolio

> **フリーランスエンジニアのポートフォリオサイト — 実務経歴・個人開発・スキル・設計図ビューアを掲載**

**Demo:** [https://portfolio-seiryuu.vercel.app](https://portfolio-seiryuu.vercel.app)

---

## 開発の背景

フリーランスとして独立する際、「この人に頼めば全部やってくれる」と思ってもらえるポートフォリオが必要でした。単なるプロフィール紹介ではなく、**実際に動くプロダクトの設計図をインタラクティブに見せる**ことで、技術力を具体的に証明できるサイトを目指しています。

| 一般的なポートフォリオ | このポートフォリオ                                                |
| ---------------------- | ----------------------------------------------------------------- |
| スクショとテキストだけ | **設計図ビューア**でER図・認証フロー・API設計をタブ切替で閲覧可能 |
| 技術スタックの羅列     | **59項目をA〜Dランク付け**、業務/個人開発の区分も明記             |
| 静的ページ             | **FadeInアニメーション・ダークテーマ**で没入感のあるUX            |
| SEO未対応              | **Lighthouse 100点**（robots / sitemap / JSON-LD / OG動的画像）   |

---

## プロジェクト規模

| コード行数  | コンポーネント | ページ | テスト | セクション |  設計図ビューア   |
| :---------: | :------------: | :----: | :----: | :--------: | :---------------: |
| **16,500+** |     **57**     | **4**  | **27** |   **12**   | **3プロジェクト** |

開発期間: **約2週間** / 1人開発 + Claude Code

---

## セクション一覧

| セクション     | 内容                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Hero**       | キャッチコピー・実績サマリー（経験年数 / 会員規模 / 全工程）                             |
| **About**      | 自己紹介・行動パターン・資格・MBTI・稼働条件                                             |
| **Career**     | SES → フリーランスの職務経歴タイムライン（4案件）                                        |
| **Works**      | 個人開発5プロダクト（DevDex / darts Lab / SaaS Launcher / next-api-composer / MonkMode） |
| **Skills**     | 技術スタック59項目（A〜D ランク・業務/個人タグ付き・カテゴリフィルター）                 |
| **Services**   | 提供サービス4領域（フルスタック / インフラ / 品質保証 / AI駆動開発）                     |
| **Dev Style**  | 開発スタイル8項目（CI/CD・テスト自動化・設計書・セキュリティ・AI SubAgents）             |
| **Tools**      | 使用ツール5カテゴリ（エディタ / CI / デザイン / プロジェクト管理 / AI）                  |
| **Milestones** | キャリアのマイルストーン（ベンプレ100kg → プロライセンス → 独立 → SaaS）                 |
| **Vision**     | 成長ロードマップと今後のビジョン                                                         |
| **Next Step**  | 習得予定技術（Vue/Python/Go）・AI駆動開発ビジョン                                        |
| **FAQ**        | よくある質問8項目                                                                        |
| **Contact**    | メール・スキルシートDL・SNSリンク（GitHub / X / Zenn / note）                            |

### 設計図ビューア（サブページ）

プロジェクトごとにインタラクティブな設計図をタブ切替で閲覧可能:

| パス                      | プロジェクト  | 図の種類                                                                        |
| ------------------------- | ------------- | ------------------------------------------------------------------------------- |
| `/projects/devdex`        | DevDex        | アーキテクチャ / ER図 / 認証RLS / API / 画面遷移 / AI統合 / 要件 / 開発プロセス |
| `/projects/darts-lab`     | Darts Lab     | アーキテクチャ / ER図 / 認証課金 / Cronバッチ / 画面遷移 / API / 要件           |
| `/projects/saas-launcher` | SaaS Launcher | アーキテクチャ / 認証 / 決済 / RBAC / ミドルウェア                              |

---

## Tech Stack

| カテゴリ          | 技術                                              |
| ----------------- | ------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router) + React 19                |
| **Language**      | TypeScript 5 (strict)                             |
| **Styling**       | Tailwind CSS v4                                   |
| **Test**          | Vitest + @testing-library/react (27 tests)        |
| **Lint / Format** | ESLint + Prettier                                 |
| **Hosting**       | Vercel (自動デプロイ)                             |
| **SEO**           | robots.ts / sitemap.ts / JSON-LD / OG動的画像生成 |
| **Animation**     | CSS transitions + FadeIn (Intersection Observer)  |

---

## アーキテクチャ

```
App Router (Server Components)
├── 静的レンダリング（12セクション）
├── クライアントコンポーネント（FadeIn, Skills Filter, Image Gallery）
├── 設計図ビューア（/projects/[slug]） — Reactで描画するインタラクティブ図
├── OG画像動的生成（opengraph-image.tsx）
└── SEO自動生成（robots.ts, sitemap.ts, JSON-LD）
```

### SEO対策

- `robots.ts` — クローラー制御
- `sitemap.ts` — 全ページのURL + lastModified（ビルド時自動更新）
- JSON-LD — Person スキーマ（構造化データ）
- OG画像 — `opengraph-image.tsx` で動的生成
- カスタム404 — `not-found.tsx`

---

## Development

```bash
npm run dev          # 開発サーバー (localhost:3000)
npm run build        # プロダクションビルド
npm run lint         # ESLint
npm run format       # Prettier フォーマット
npm run test         # Vitest
vercel --prod        # 本番デプロイ
```

## デプロイ

- `main` ブランチへの push で Vercel が自動デプロイ
- 本番URL: https://portfolio-seiryuu.vercel.app

---

## Author

**Seiryuu** — フリーランスエンジニア / ダーツプロ（PERFECT所属）

- [Portfolio](https://portfolio-seiryuu.vercel.app)
- [GitHub](https://github.com/seiryuu1215)
- [Zenn](https://zenn.dev/seiryuuu_dev)
- [note](https://note.com/seiryuu_dev)
- [X](https://x.com/seiryuu_darts)
