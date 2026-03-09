/**
 * 週次開発日記の自動生成スクリプト
 *
 * 使い方:
 *   npm run diary:weekly -- --darts-file /tmp/darts-commits.txt --portfolio-file /tmp/portfolio-commits.txt
 *
 * または CI/CD から:
 *   ts-node scripts/generate-weekly-diary.ts --darts-file ... --portfolio-file ...
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY  - Anthropic API キー
 *   DIARY_YEAR         - 対象年（例: 2026）
 *   DIARY_WEEK         - 対象週番号（例: 10）
 *   DIARY_SINCE        - 週の開始日（例: 2026-03-02）
 */

import * as fs from 'fs';
import * as path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
  process.exit(1);
}

function parseArgs(): { dartsFile: string; portfolioFile: string } {
  const args = process.argv.slice(2);
  let dartsFile = '';
  let portfolioFile = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--darts-file' && args[i + 1]) {
      dartsFile = args[++i];
    } else if (args[i] === '--portfolio-file' && args[i + 1]) {
      portfolioFile = args[++i];
    }
  }

  return { dartsFile, portfolioFile };
}

function readFileOrEmpty(filePath: string): string {
  if (!filePath) return '';
  try {
    return fs.readFileSync(filePath, 'utf-8').trim();
  } catch {
    return '';
  }
}

function getWeekInfo(): { year: string; week: string; since: string } {
  const now = new Date();
  const year = process.env.DIARY_YEAR || now.getFullYear().toString();
  const week = process.env.DIARY_WEEK || getISOWeek(now).toString().padStart(2, '0');
  const since = process.env.DIARY_SINCE || now.toISOString().slice(0, 10);
  return { year, week: week.padStart(2, '0'), since };
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getMonthWeek(since: string): { month: number; weekOfMonth: number } {
  const date = new Date(since);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekOfMonth = Math.ceil(day / 7);
  return { month, weekOfMonth };
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
      max_tokens: 4096,
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
  const { dartsFile, portfolioFile } = parseArgs();
  const dartsCommits = readFileOrEmpty(dartsFile);
  const portfolioCommits = readFileOrEmpty(portfolioFile);

  if (!dartsCommits && !portfolioCommits) {
    console.log('No commits found. Skipping diary generation.');
    return;
  }

  const { year, week, since } = getWeekInfo();
  const { month, weekOfMonth } = getMonthWeek(since);

  console.log(`Generating weekly diary for ${year} W${week}...`);

  const prompt = `あなたは個人開発エンジニアの週次開発日記を書くアシスタントです。
以下のコミットログから、Zennに投稿する開発日記を生成してください。

語調: エンジニア向け、ですます調
読者: 技術ブログの読者（個人開発に興味があるエンジニア）

## darts-app（ダーツ分析Webアプリ）のコミット
${dartsCommits || '（今週のコミットなし）'}

## portfolio（ポートフォリオサイト）のコミット
${portfolioCommits || '（今週のコミットなし）'}

以下の構成でMarkdown記事を生成してください。frontmatterは不要です（別途付与します）。

## 今週のサマリー
（200字以内で今週の作業を要約）

## darts-app の作業内容
（コミットをカテゴリ別に整理して箇条書き。各項目に背景・意図を1文で補完）

## portfolio の作業内容
（コミットをカテゴリ別に整理して箇条書き。各項目に背景・意図を1文で補完。コミットがなければ「今週は更新なし」）

## 課題・気づき
（fix/refactor コミットから抽出した課題を2〜4点。技術的な学びを含める）

## 来週の予定
（今週の流れから推測される次のアクションを2〜3点）`;

  const body = await callAnthropic(prompt);

  // ハイライトをサマリーの最初の文から抽出
  const summaryMatch = body.match(/## 今週のサマリー\s*\n+([\s\S]*?)(?=\n## )/);
  const highlight = summaryMatch
    ? summaryMatch[1].trim().slice(0, 40).replace(/\n/g, ' ')
    : '開発進捗';

  const frontmatter = `---
title: "開発日記 ${year}年${month}月第${weekOfMonth}週 — ${highlight}"
emoji: "🎯"
type: "idea"
topics: ["nextjs", "typescript", "claudecode", "個人開発"]
published: true
---`;

  const article = `${frontmatter}\n\n${body}\n`;

  // articles/ ディレクトリに保存
  const articlesDir = path.resolve(__dirname, '..', 'articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  const filename = `diary-${year}-w${week}.md`;
  const outputPath = path.join(articlesDir, filename);
  fs.writeFileSync(outputPath, article, 'utf-8');
  console.log(`Article written to ${outputPath}`);
}

main().catch((err) => {
  console.error('Failed to generate weekly diary:', err);
  process.exit(1);
});
