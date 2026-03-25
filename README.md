[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://portfolio-seiryuu.vercel.app)
[![Vitest](https://img.shields.io/badge/Vitest-27_tests-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

# Seiryuu Portfolio

> フルスタックエンジニアのポートフォリオサイト — 実務経歴・個人開発・スキル・設計図ビューアを掲載

**https://portfolio-seiryuu.vercel.app**

---

## Sections

| セクション | 内容 |
|---|---|
| **Hero** | キャッチコピー・実績サマリー（経験年数 / 会員規模 / 全工程） |
| **About** | 自己紹介・行動パターン・資格・MBTI・稼働条件 |
| **Career** | SES → フリーランスの職務経歴タイムライン（4案件） |
| **Works** | 個人開発5プロダクト（DevDex / darts Lab / SaaS Launcher / next-api-composer / MonkMode） |
| **Articles** | Zenn 記事20本 + Book 2冊 + note 2本をカテゴリ別に掲載 |
| **Skills** | 技術スタック59項目（A〜D ランク・業務/個人タグ付き） |
| **Services** | 提供サービス（フルスタック / インフラ / 品質 / AI駆動開発） |
| **Dev Style** | CI/CD・テスト自動化・設計書・セキュリティレビュー・AI SubAgents |
| **Milestones** | キャリアのマイルストーン（ベンプレ100kg → プロライセンス → 独立 → SaaS） |
| **Next Step** | 習得予定技術（Vue/Python/Go）・AI駆動開発ビジョン |
| **FAQ** | よくある質問8項目 |
| **Contact** | メール・スキルシートDL・SNSリンク（GitHub / X / Zenn / note） |

### 設計図ビューア（サブページ）

プロジェクトごとにインタラクティブな設計図をタブ切替で閲覧可能:

- `/projects/devdex` — アーキテクチャ / ER図 / 認証RLS / API / 画面遷移 / AI統合 / 要件 / 開発プロセス
- `/projects/darts-lab` — アーキテクチャ / ER図 / 認証課金 / Cronバッチ / 画面遷移 / API / 要件
- `/projects/saas-launcher` — アーキテクチャ / 認証 / 決済 / RBAC / ミドルウェア

---

## Tech Stack

```
Framework    Next.js 16 (App Router) + React 19
Language     TypeScript 5 (strict)
Styling      Tailwind CSS v4
Test         Vitest (27 tests)
Hosting      Vercel
SEO          robots.ts / sitemap.ts / JSON-LD / OGP dynamic image
```

## Development

```bash
npm run dev          # 開発サーバー (localhost:3000)
npm run build        # プロダクションビルド
npm run lint         # ESLint
npm run test         # Vitest
vercel --prod        # 本番デプロイ
```

## Author

**Seiryuu** — フリーランス フルスタックエンジニア

- [Portfolio](https://portfolio-seiryuu.vercel.app)
- [GitHub](https://github.com/seiryuu1215)
- [Zenn](https://zenn.dev/seiryuuu_dev)
- [note](https://note.com/seiryuu_dev)
- [X](https://x.com/seiryuu_darts)
