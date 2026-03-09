# CLAUDE.md

## プロジェクト概要

フルスタックエンジニアのポートフォリオサイト（Next.js 16 + React 19 + Tailwind CSS v4）。
本番URL: https://portfolio-seiryuu.vercel.app

## 言語

- コード: 英語（変数名・コンポーネント名）
- コミットメッセージ・UI・コメント: 日本語
- Claude Codeとの会話: 日本語で応答してください

## 技術スタック

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- Vitest（ユニットテスト）
- Vercel（ホスティング）

## コマンド

```bash
npm run dev          # 開発サーバー
npm run build        # プロダクションビルド
npm run lint         # ESLint
npm run format       # Prettier フォーマット
npm run format:check # Prettier チェック（CI用）
npm run test         # テスト実行
npm run diary        # 日次開発日記生成（Anthropic API）
npm run diary:weekly # 週次開発日記生成（Anthropic API）
```

## デプロイ

- `vercel --prod` で手動デプロイ
- 本番URL: https://portfolio-seiryuu.vercel.app

## コミット規約

- 形式: `type: 日本語の説明`
- type: `feat`, `fix`, `docs`, `refactor`, `chore`, `update`
- 例: `feat: darts Lab スクリーンショット最新化`

## ディレクトリ構成

```
app/           — Next.js App Router ページ
components/    — UIコンポーネント
public/        — 静的アセット（画像・アイコン）
scripts/       — 自動化スクリプト（日記生成・スクリーンショット）
docs/          — 開発日記・意思決定記録・レビュー記録
.claude/agents — SubAgents 定義
```

## SubAgents フロー

ユーザーの要望を受けたら以下の順でエージェントを呼び出す：

1. pm-agent → 要件整理・意思決定記録
2. implement-agent → 実装
3. test-agent → TDD・テスト確認
4. review-agent → コードレビュー
5. diary-agent → 作業終了時に呼ぶ（毎日1回）

各エージェントは前のエージェントの完了を受けて起動する。

## クロスリポ同期ルール

このポートフォリオは **darts-app** の実績を展示するサイト。
darts-app の数値変更時にこちらも更新が必要。

### 同期が必要なケース

| darts-app の変更     | portfolio の更新箇所                     |
| -------------------- | ---------------------------------------- |
| LOC 変動（±5,000行） | Hero セクション・Works カードの行数      |
| 機能追加・削除       | Works セクションの機能数                 |
| テスト数変動         | Hero セクションのテスト数                |
| API ルート追加・削除 | 設計図ビューアの数値                     |
| version 変更         | scale タグ                               |
| UI の大きな変更      | スクリーンショット（`public/` 内の画像） |

### 数値の参照元

darts-app の `docs/metrics.json` を正とする。手動でハードコードしない。
`npm run metrics`（darts-app 側）で最新値を生成し、portfolio 側で参照する。

## Compact Instructions

このセッションを要約するとき：

- 全コンポーネントの変更内容と選択理由を保持する
- エラーとその解決策を保持する
- 変更したファイル一覧を保持する
- 試みたが失敗したアプローチは簡潔に要約する
- darts-app との同期状態を保持する
- docs/decisions/の意思決定サマリーを保持する

## ログ・分析

- ログ確認: `npm run logs:analyze`
- ログ保存先: docs/logs/YYYY-MM-DD.jsonl
