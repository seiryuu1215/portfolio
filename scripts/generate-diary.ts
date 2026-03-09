/**
 * セッション終了時の開発日記自動生成スクリプト
 *
 * 使い方: npm run diary
 *
 * 仕様:
 * - 当日の git diff と commit メッセージを取得
 * - Anthropic API (claude-sonnet-4-20250514) で意図・課題を補完
 * - docs/diary/YYYY-MM-DD.md を生成（既存は上書き更新）
 * - ルートに session-note.md があれば内容を統合する
 * - portfolio は README.md の TODO セクションから「次にやること」を抽出
 * - darts-app は docs/04-task-breakdown.md から未完了タスクを抽出
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
  process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, '..');
const today = new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD format

function run(cmd: string, cwd: string = ROOT_DIR): string {
  try {
    return execSync(cmd, { cwd, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }).trim();
  } catch {
    return '';
  }
}

function getCommits(): string {
  return run(
    `git log --oneline --since="${today}T00:00:00" --until="${today}T23:59:59" --no-merges`,
  );
}

function getDiffStat(): string {
  return run(`git diff --stat HEAD~10 HEAD 2>/dev/null || git diff --stat HEAD`);
}

function getSessionNote(): string {
  const notePath = path.join(ROOT_DIR, 'session-note.md');
  if (fs.existsSync(notePath)) {
    return fs.readFileSync(notePath, 'utf-8');
  }
  return '';
}

function getTodos(): string {
  // portfolio: README.md の TODO セクションから抽出
  const readmePath = path.join(ROOT_DIR, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const todoMatch = readme.match(/## TODO[\s\S]*?(?=\n## |$)/i);
    if (todoMatch) {
      return todoMatch[0];
    }
  }

  // darts-app: docs/04-task-breakdown.md から未完了タスクを抽出
  const taskBreakdownPath = path.join(ROOT_DIR, 'docs', '04-task-breakdown.md');
  if (fs.existsSync(taskBreakdownPath)) {
    const content = fs.readFileSync(taskBreakdownPath, 'utf-8');
    const unchecked = content
      .split('\n')
      .filter((line) => line.match(/^- \[ \]/))
      .slice(0, 10)
      .join('\n');
    if (unchecked) {
      return unchecked;
    }
  }

  return '';
}

function getDecisions(): string {
  const decisionsDir = path.join(ROOT_DIR, 'docs', 'decisions');
  if (!fs.existsSync(decisionsDir)) return '';

  const files = fs.readdirSync(decisionsDir).filter((f) => f.startsWith(today));
  return files
    .map((f) => {
      const content = fs.readFileSync(path.join(decisionsDir, f), 'utf-8');
      return `### ${f}\n${content}`;
    })
    .join('\n\n');
}

function getReviews(): string {
  const reviewPath = path.join(ROOT_DIR, 'docs', 'review', `${today}.md`);
  if (fs.existsSync(reviewPath)) {
    return fs.readFileSync(reviewPath, 'utf-8');
  }
  return '';
}

async function callAnthropic(prompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as { content: Array<{ type: string; text: string }> };
  return data.content[0].text;
}

async function main() {
  console.log(`Generating diary for ${today}...`);

  const commits = getCommits();
  if (!commits) {
    console.log('No commits found for today. Skipping diary generation.');
    return;
  }

  const diffStat = getDiffStat();
  const sessionNote = getSessionNote();
  const todos = getTodos();
  const decisions = getDecisions();
  const reviews = getReviews();

  const prompt = `あなたは開発日記の自動生成アシスタントです。以下の情報から開発日記を生成してください。

## 今日のコミット
${commits}

## 変更ファイル統計
${diffStat}

${sessionNote ? `## セッションノート\n${sessionNote}` : ''}

${decisions ? `## 意思決定記録\n${decisions}` : ''}

${reviews ? `## レビュー記録\n${reviews}` : ''}

${todos ? `## 未完了タスク（次にやること候補）\n${todos}` : ''}

以下のフォーマットで日本語の開発日記を生成してください。Markdownで出力してください。

# 開発日記: ${today}

## やったこと
（コミットメッセージからまとめる。カテゴリ別に整理）

## 意思決定サマリー
（意思決定記録があれば要約、なければ「特になし」）

## テスト結果
（コミットからテスト関連の情報を抽出、なければ「特になし」）

## レビュー結果
（レビュー記録があれば要約、なければ「特になし」）

## 課題・気づき
（fixコミットやdebugコミットから推測される課題を2〜3点）

## 次にやること
（未完了タスクがあればそこから、なければコミット内容から推測）

---
Zenn投稿用サマリー（200字）:
（今日の作業を技術ブログ読者向けに200字で要約）`;

  const diary = await callAnthropic(prompt);

  const diaryDir = path.join(ROOT_DIR, 'docs', 'diary');
  if (!fs.existsSync(diaryDir)) {
    fs.mkdirSync(diaryDir, { recursive: true });
  }

  const diaryPath = path.join(diaryDir, `${today}.md`);
  fs.writeFileSync(diaryPath, diary, 'utf-8');
  console.log(`Diary written to ${diaryPath}`);
}

main().catch((err) => {
  console.error('Failed to generate diary:', err);
  process.exit(1);
});
