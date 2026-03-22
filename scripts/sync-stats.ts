#!/usr/bin/env npx tsx
/**
 * ポートフォリオのプロジェクト統計を自動更新するスクリプト
 *
 * Usage:
 *   npx tsx scripts/sync-stats.ts              # 全サービス
 *   npx tsx scripts/sync-stats.ts devdex       # DevDexだけ
 *
 * やること:
 *   1. 各サービスのリポジトリからgit/ファイル統計を取得
 *   2. WorksSection.tsx の数値を自動更新
 *   3. 画像パスを最新のキャプチャファイル名に更新
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const WORKS_FILE = path.join(ROOT_DIR, 'components', 'WorksSection.tsx');

interface ServiceStats {
  id: string;
  repoPath: string;
  /** WorksSection.tsx 内のプロジェクトtitle（スコープ制限用） */
  worksTitle: string;
  /** scale配列のvalue→labelマッピングで更新する */
  scaleUpdates: Record<string, () => string>;
  /** 画像パスの old→new マッピング */
  imageUpdates?: Record<string, string>;
}

function run(cmd: string, cwd?: string): string {
  try {
    return execSync(cmd, { cwd, encoding: 'utf-8', timeout: 30000 }).trim();
  } catch {
    return '';
  }
}

function countLines(repoPath: string): string {
  const result = run(
    `find src -name "*.ts" -o -name "*.tsx" | xargs wc -l 2>/dev/null | tail -1`,
    repoPath,
  );
  const match = result.match(/(\d+)/);
  if (!match) return '0';
  return Number(match[1]).toLocaleString();
}

function countTests(repoPath: string): string {
  const result = run(
    `npx vitest run --reporter=json 2>/dev/null | grep -o '"numTotalTests":[0-9]*' | head -1`,
    repoPath,
  );
  const match = result.match(/(\d+)/);
  if (match) return Number(match[1]).toLocaleString();

  // フォールバック: テストファイルからitの数をカウント
  const grepResult = run(
    `grep -r "it(" src --include="*.test.ts" --include="*.test.tsx" | wc -l`,
    repoPath,
  );
  return Number(grepResult.trim() || '0').toLocaleString();
}

function countPRs(repoPath: string): string {
  const result = run(`gh pr list --state merged --limit 1000 --json number | jq length`, repoPath);
  return result ? `${result}+` : '0';
}

function countCommits(repoPath: string): string {
  const result = run(`git rev-list --count HEAD`, repoPath);
  return result ? `${Number(result).toLocaleString()}+` : '0';
}

function countApiRoutes(repoPath: string): string {
  const result = run(`find src/app/api -name "route.ts" 2>/dev/null | wc -l`, repoPath);
  return result.trim();
}

function countPages(repoPath: string): string {
  const result = run(`find src/app -name "page.tsx" 2>/dev/null | wc -l`, repoPath);
  return result.trim();
}

function countComponents(repoPath: string): string {
  const result = run(
    `find src/components -name "*.tsx" -not -name "*.test.*" 2>/dev/null | wc -l`,
    repoPath,
  );
  return result.trim();
}

function countMigrations(repoPath: string): string {
  const result = run(`ls supabase/migrations/*.sql 2>/dev/null | wc -l`, repoPath);
  return result.trim();
}

function countReleases(repoPath: string): string {
  const result = run(`git tag | wc -l`, repoPath);
  return result.trim();
}

function countDecisions(repoPath: string): string {
  const result = run(`ls docs/decisions/*.md 2>/dev/null | wc -l`, repoPath);
  return result.trim();
}

function countOpenIssues(repoPath: string): string {
  const result = run(`gh issue list --state open --json number | jq length`, repoPath);
  return result || '0';
}

function getTestCount(repoPath: string): string {
  // vitest run の結果から正確なテスト数を取得
  const result = run(`cd ${repoPath} && npm run test:unit 2>&1 | grep "Tests" | tail -1`, repoPath);
  const match = result.match(/(\d[\d,]*)\s+passed/);
  if (match) return match[1];

  // フォールバック
  return countTests(repoPath);
}

// --- サービス定義 ---

const DEVDEX_PATH = path.join(ROOT_DIR, '..', 'devdex');

const serviceConfigs: ServiceStats[] = [
  {
    id: 'devdex',
    repoPath: DEVDEX_PATH,
    worksTitle: 'DevDex — IT用語理解度管理ツール',
    scaleUpdates: {
      マージ済みPR: () => countPRs(DEVDEX_PATH),
      コミット: () => countCommits(DEVDEX_PATH),
      'API routes': () => countApiRoutes(DEVDEX_PATH),
      ページ: () => countPages(DEVDEX_PATH),
      コンポーネント: () => countComponents(DEVDEX_PATH),
      '行（TS）': () => countLines(DEVDEX_PATH),
      テスト: () => getTestCount(DEVDEX_PATH),
      マイグレーション: () => countMigrations(DEVDEX_PATH),
      リリース: () => countReleases(DEVDEX_PATH),
      意思決定記録: () => countDecisions(DEVDEX_PATH),
      'open issue': () => countOpenIssues(DEVDEX_PATH),
    },
    imageUpdates: {
      '/images/devdex/01-dashboard-viewport.png': '/images/devdex/01-dashboard.png',
      '/images/devdex/02-terms-viewport.png': '/images/devdex/02-terms.png',
      '/images/devdex/03-diagnosis-viewport.png': '/images/devdex/03-diagnosis.png',
      '/images/devdex/04-extract-viewport.png': '/images/devdex/04-extract.png',
      '/images/devdex/05-pricing-viewport.png': '/images/devdex/05-pricing.png',
      '/images/devdex/06-diagnosis-result-viewport.png': '/images/devdex/06-diagnosis-result.png',
    },
  },
];

// --- メイン ---

function updateScaleValues(content: string, service: ServiceStats): string {
  // プロジェクトタイトルの位置を見つけて、次のプロジェクトまでの範囲内でのみ置換
  const titleEscaped = service.worksTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titleIdx = content.indexOf(`title: '${service.worksTitle}'`);
  if (titleIdx === -1) {
    console.error(`  ❌ プロジェクト "${service.worksTitle}" が見つかりません`);
    return content;
  }

  // 次の title: ' を探して範囲を特定（なければファイル末尾まで）
  const nextTitleIdx = content.indexOf("title: '", titleIdx + 1);
  const endIdx = nextTitleIdx === -1 ? content.length : nextTitleIdx;

  let section = content.substring(titleIdx, endIdx);

  for (const [label, getter] of Object.entries(service.scaleUpdates)) {
    const newValue = getter();
    if (!newValue || newValue === '0') continue;

    const regex = new RegExp(
      `(\\{\\s*value:\\s*')([^']*?)('\\s*,\\s*label:\\s*'${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}')`,
      'g',
    );
    const before = section;
    section = section.replace(regex, `$1${newValue}$3`);
    if (section !== before) {
      console.log(`  📊 ${label}: ${newValue}`);
    }
  }

  return content.substring(0, titleIdx) + section + content.substring(endIdx);
}

function updateImagePaths(content: string, service: ServiceStats): string {
  if (!service.imageUpdates) return content;

  // 画像パスにサービス固有のディレクトリが含まれるので、そのまま全体置換で安全
  let updated = content;
  for (const [oldPath, newPath] of Object.entries(service.imageUpdates)) {
    if (updated.includes(oldPath)) {
      updated = updated.replaceAll(oldPath, newPath);
      console.log(`  🖼️  ${oldPath} → ${newPath}`);
    }
  }
  return updated;
}

// --- Zenn 更新 ---

const ZENN_DIR = path.join(ROOT_DIR, '..', 'zenn-content');

interface ZennUpdate {
  file: string;
  updates: Array<{ old: string | RegExp; new: string }>;
}

function getZennUpdates(): ZennUpdate[] {
  const tests = getTestCount(DEVDEX_PATH);
  const prs = countPRs(DEVDEX_PATH);
  const lines = countLines(DEVDEX_PATH);
  const apis = countApiRoutes(DEVDEX_PATH);
  const pages = countPages(DEVDEX_PATH);
  const migrations = countMigrations(DEVDEX_PATH);
  const decisions = countDecisions(DEVDEX_PATH);

  return [
    // 1. config.yaml タイトル
    {
      file: 'books/claude-code-devdex/config.yaml',
      updates: [
        {
          old: /実質7日で作った[\d,]+行のSaaS/,
          new: `実質7日で作った${lines}行のSaaS`,
        },
      ],
    },
    // 2. 10-retrospective.md 集計テーブル
    {
      file: 'books/claude-code-devdex/10-retrospective.md',
      updates: [
        { old: /APIエンドポイント \| \d+本/, new: `APIエンドポイント | ${apis}本` },
        { old: /ページ数 \| \d+画面/, new: `ページ数 | ${pages}画面` },
        {
          old: /ユニットテスト \| [\d,]+件（\d+ファイル）/,
          new: `ユニットテスト | ${tests}件（228ファイル）`,
        },
        { old: /DBマイグレーション \| \d+本/, new: `DBマイグレーション | ${migrations}本` },
        { old: /PR（マージ済み） \| [\d,]+\+件/, new: `PR（マージ済み） | ${prs}件` },
        { old: /意思決定記録 \| \d+件/, new: `意思決定記録 | ${decisions}件` },
      ],
    },
    // 3. 10-retrospective.md 末尾に最新数値セクション追加（なければ）
    {
      file: 'books/claude-code-devdex/10-retrospective.md',
      updates: [
        {
          old: /\n---\n\n> \*\*📊 最新の数値[\s\S]*$/,
          new: `\n---\n\n> **📊 最新の数値（自動更新）**: ${tests}テスト / ${prs} PR / ${lines}行（TS） / ${apis} API / ${pages}ページ / ${migrations}マイグレーション / ${decisions}意思決定記録 — [devdex.dev](https://devdex.dev)`,
        },
      ],
    },
    // 4. 告知記事 devdex-launch.md の冒頭数値
    {
      file: 'articles/devdex-launch.md',
      updates: [
        {
          old: /[\d,]+行・[\d,]+テスト・Stripe/,
          new: `${lines}行・${tests}テスト・Stripe`,
        },
      ],
    },
  ];
}

function updateZenn(): void {
  if (!fs.existsSync(ZENN_DIR)) {
    console.log('  ⏭️  zenn-content リポジトリが見つかりません、スキップ');
    return;
  }

  console.log('\n📖 Zenn コンテンツ更新');

  const updates = getZennUpdates();

  for (const { file, updates: fileUpdates } of updates) {
    const filePath = path.join(ZENN_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭️  ${file} が見つかりません`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    for (const update of fileUpdates) {
      const before = content;
      if (typeof update.old === 'string') {
        content = content.replaceAll(update.old, update.new);
      } else {
        content = content.replace(update.old, update.new);
      }
      if (content !== before) changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  — ${file}（変更なし）`);
    }
  }

  // 最新数値セクションがなければ追加
  const retroFile = path.join(ZENN_DIR, 'books/claude-code-devdex/10-retrospective.md');
  let retroContent = fs.readFileSync(retroFile, 'utf-8');
  if (!retroContent.includes('📊 最新の数値')) {
    const tests = getTestCount(DEVDEX_PATH);
    const prs = countPRs(DEVDEX_PATH);
    const lines = countLines(DEVDEX_PATH);
    const apis = countApiRoutes(DEVDEX_PATH);
    const pages = countPages(DEVDEX_PATH);
    const migrations = countMigrations(DEVDEX_PATH);
    const decisions = countDecisions(DEVDEX_PATH);
    retroContent += `\n---\n\n> **📊 最新の数値（自動更新）**: ${tests}テスト / ${prs} PR / ${lines}行（TS） / ${apis} API / ${pages}ページ / ${migrations}マイグレーション / ${decisions}意思決定記録 — [devdex.dev](https://devdex.dev)\n`;
    fs.writeFileSync(retroFile, retroContent, 'utf-8');
    console.log(`  ✅ 10-retrospective.md（最新数値セクション追加）`);
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const serviceFilter = args[0];

  const targets = serviceFilter
    ? serviceConfigs.filter((s) => s.id === serviceFilter)
    : serviceConfigs;

  if (targets.length === 0) {
    console.error(`サービス "${serviceFilter}" が見つかりません`);
    process.exit(1);
  }

  console.log('📝 ポートフォリオ統計の自動更新');
  console.log(`対象: ${targets.map((s) => s.id).join(', ')}\n`);

  let content = fs.readFileSync(WORKS_FILE, 'utf-8');

  for (const service of targets) {
    console.log(`🔄 ${service.id}`);

    if (!fs.existsSync(service.repoPath)) {
      console.error(`  ❌ リポジトリが見つかりません: ${service.repoPath}`);
      continue;
    }

    content = updateScaleValues(content, service);
    content = updateImagePaths(content, service);
  }

  fs.writeFileSync(WORKS_FILE, content, 'utf-8');
  console.log('\n✅ WorksSection.tsx を更新しました');

  // Zenn更新（devdexが対象に含まれる場合）
  if (targets.some((t) => t.id === 'devdex')) {
    updateZenn();
  }
}

main().catch((err) => {
  console.error('エラー:', err);
  process.exit(1);
});
