---
name: test-patterns
description: テスト記述パターン。Vitest 4 + Testing Libraryの書き方ルール。テスト作成・レビュー時に自動適用する。
---

## フレームワーク

- ユニットテスト: Vitest 4 + @testing-library/react
- 環境: jsdom

## ファイル配置

- ユニットテスト: **tests**/ファイル名.test.ts（tsxも可）

## 書き方ルール

- describe/itブロックを使う（testではなくit）
- テスト名は日本語「〜すること」形式
- モック: vi.mock()を使う。any禁止
- 非同期: async/await形式

## TDD順序

1. 失敗するテストを先に書く
2. 最小限の実装でグリーンにする
3. リファクタリングする
