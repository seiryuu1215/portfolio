---
name: portfolio-conventions
description: ポートフォリオサイト固有のコーディング規約。Next.js App Router・Tailwind CSS v4・コンポーネント設計のルール。実装・レビュー・PM作業時に自動適用する。
---

## 言語ルール

- コード（変数名・関数名・型名・ファイル名）: 英語
- コミットメッセージ・UIテキスト・コメント・ドキュメント: 日本語
- Claude Codeとの会話: 日本語で応答する

## TypeScript

- `any` 禁止。unknown + 型ガードを使う
- `as` キャストは最終手段
- ES Modules（import/export）。CommonJSのrequire禁止
- Prettierフォーマット必須

## スタイリング

- Tailwind CSS v4 のユーティリティクラスを使用
- MUI禁止（darts-appとの差別化）
- カスタムCSSは最小限に

## コンポーネント設計

- Server Components優先、必要な場合のみ 'use client'
- propsの型定義は必ずinterfaceで明示する
- コンポーネントは `components/` 配下に配置

## クロスリポ同期

- darts-app の `docs/metrics.json` を数値の正とする
- 手動でのハードコード禁止
