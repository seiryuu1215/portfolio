'use client';

import { useState } from 'react';
import SectionHeading from './SectionHeading';

interface SkillItem {
  name: string;
  level: 'A' | 'B' | 'C' | 'D';
  source?: 'work' | 'personal' | 'both';
  note?: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

// devicon CDN slug マッピング（A+Bスキルのみ）
const DEVICON_MAP: Record<string, string> = {
  'TypeScript 5 (strict)': 'typescript/typescript-original',
  'React 19': 'react/react-original',
  'HTML / CSS': 'html5/html5-original',
  'Git / GitHub': 'git/git-original',
  'Next.js 16 (App Router)': 'nextjs/nextjs-original',
  'Node.js': 'nodejs/nodejs-original',
  Express: 'express/express-original',
  'MUI v7': 'materialui/materialui-original',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original',
  Handlebars: 'handlebars/handlebars-original',
  'NextAuth.js + Firebase Auth': 'firebase/firebase-plain',
  'Cloud Firestore': 'firebase/firebase-plain',
  MongoDB: 'mongodb/mongodb-original',
  'AWS (Lambda / DynamoDB / CloudWatch)': 'amazonwebservices/amazonwebservices-original-wordmark',
  'Firebase (Auth / Firestore / Storage)': 'firebase/firebase-plain',
  Vercel: 'vercel/vercel-original',
  'Vitest / Jest (164 tests)': 'vitejs/vitejs-original',
  'GitHub Actions': 'githubactions/githubactions-original',
  'ESLint / Prettier': 'eslint/eslint-original',
  'Recharts 3': 'react/react-original',
  Figma: 'figma/figma-original',
};

function deviconUrl(slug: string): string {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`;
}

// README tech stack + スキルシートレベルを統合
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'フレームワーク / 言語',
    items: [
      { name: 'TypeScript 5 (strict)', level: 'A', source: 'both', note: '実務3年+個人開発' },
      { name: 'React 19', level: 'A', source: 'both', note: '実務3年+個人開発' },
      { name: 'Next.js 16 (App Router)', level: 'B', source: 'both', note: '実務3年+個人開発' },
      { name: 'Node.js', level: 'B', source: 'both' },
      { name: 'HTML / CSS', level: 'A', source: 'work' },
      { name: 'Express', level: 'B', source: 'work' },
    ],
  },
  {
    category: 'UI / グラフ',
    items: [
      { name: 'MUI v7', level: 'B', source: 'both' },
      { name: 'Tailwind CSS', level: 'B', source: 'personal' },
      { name: 'Recharts 3', level: 'B', source: 'personal', note: '統計グラフ・深掘り分析で多用' },
      { name: 'Handlebars', level: 'B', source: 'work' },
    ],
  },
  {
    category: '認証 / 決済',
    items: [
      { name: 'NextAuth.js + Firebase Auth', level: 'B', source: 'personal', note: 'ロールベース制御' },
      { name: 'Stripe (Subscription / Webhook)', level: 'C', source: 'personal', note: 'サーバーサイド完結' },
    ],
  },
  {
    category: 'データベース',
    items: [
      { name: 'Cloud Firestore', level: 'B', source: 'personal', note: '設計+セキュリティルール' },
      { name: 'MongoDB', level: 'B', source: 'work' },
      { name: 'DynamoDB', level: 'C', source: 'work' },
      { name: 'DocumentDB', level: 'C', source: 'work' },
      { name: 'MySQL', level: 'C', source: 'work' },
    ],
  },
  {
    category: 'インフラ / クラウド',
    items: [
      { name: 'AWS (Lambda / DynamoDB / CloudWatch)', level: 'B', source: 'work' },
      { name: 'Firebase (Auth / Firestore / Storage)', level: 'B', source: 'personal' },
      { name: 'Vercel', level: 'B', source: 'personal', note: 'ホスティング+CI/CD' },
      { name: 'Fastly (CDN)', level: 'C', source: 'work' },
    ],
  },
  {
    category: 'テスト / CI / 監視',
    items: [
      { name: 'Vitest / Jest (164 tests)', level: 'B', source: 'personal' },
      { name: 'Storybook', level: 'C', source: 'both', note: '16ストーリー' },
      { name: 'GitHub Actions', level: 'B', source: 'personal', note: 'lint→format→test→build' },
      { name: 'CircleCI', level: 'C', source: 'work' },
      { name: 'Sentry', level: 'C', source: 'personal', note: 'エラー監視' },
      { name: 'ESLint / Prettier', level: 'B', source: 'both' },
    ],
  },
  {
    category: 'スクレイピング / API',
    items: [
      { name: 'Puppeteer 24', level: 'C', source: 'personal', note: 'DARTSLIVE自動取得' },
      { name: 'LINE Messaging API', level: 'C', source: 'personal', note: 'レポート自動配信' },
      { name: 'Swagger', level: 'C', source: 'work' },
    ],
  },
  {
    category: 'モバイル / その他',
    items: [
      { name: 'Serwist (PWA)', level: 'C', source: 'personal', note: 'オフラインキャッシュ' },
      { name: 'Capacitor 8 (iOS)', level: 'C', source: 'personal' },
      { name: 'Claude Code', level: 'B', source: 'personal', note: 'AI駆動開発' },
      { name: 'Figma', level: 'B', source: 'work' },
      {
        name: 'Git / GitHub',
        level: 'A',
        source: 'both',
        note: 'PR/Issue・Dependabot週次15件',
      },
    ],
  },
];

const SOURCE_STYLES: Record<string, { label: string; color: string }[]> = {
  work: [{ label: '実務', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' }],
  personal: [{ label: '個人開発', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' }],
  both: [
    { label: '実務', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
    { label: '個人開発', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  ],
};

const LEVEL_STYLES: Record<string, { label: string; color: string }> = {
  A: { label: 'A', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  B: { label: 'B', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  C: { label: 'C', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  D: { label: 'D', color: 'text-neutral-400 bg-neutral-400/10 border-neutral-400/30' },
};

type SourceFilter = 'all' | 'work' | 'personal';

const FILTER_OPTIONS: { value: SourceFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'work', label: '実務経験あり' },
  { value: 'personal', label: '個人開発' },
];

function matchesFilter(item: SkillItem, filter: SourceFilter): boolean {
  if (filter === 'all') return true;
  if (!item.source) return false;
  if (filter === 'work') return item.source === 'work' || item.source === 'both';
  return item.source === 'personal' || item.source === 'both';
}

export default function SkillsSection() {
  const [filter, setFilter] = useState<SourceFilter>('all');

  const featuredItems = SKILL_CATEGORIES.flatMap((cat) => cat.items)
    .filter((item) => item.level === 'A' || item.level === 'B')
    .filter((item) => matchesFilter(item, filter));

  const filteredCategories = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => matchesFilter(item, filter)),
  })).filter((cat) => cat.items.length > 0);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="skills" label="Skills" title="技術スタック" />

        {/* 凡例 */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-xs text-muted">
          <span><strong className="text-blue-400">A</strong> = 独力遂行・後進教育</span>
          <span><strong className="text-green-400">B</strong> = 独力遂行</span>
          <span><strong className="text-yellow-400">C</strong> = 指導下で遂行</span>
          <span><strong className="text-neutral-400">D</strong> = 学習・経験あり</span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-px text-[10px] rounded border text-sky-400 bg-sky-400/10 border-sky-400/20">実務</span>
            <span className="px-1.5 py-px text-[10px] rounded border text-purple-400 bg-purple-400/10 border-purple-400/20">個人開発</span>
            = 経験ソース
          </span>
        </div>

        {/* フィルター */}
        <div className="flex gap-2 mb-6">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                filter === opt.value
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-card border-border text-muted hover:text-foreground hover:border-accent/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Featured Skills (A+B) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {featuredItems.map((item) => {
            const style = LEVEL_STYLES[item.level];
            const slug = DEVICON_MAP[item.name];
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
              >
                {slug ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={deviconUrl(slug)}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-accent/20 text-accent text-base font-bold">
                    {item.name[0]}
                  </span>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold truncate">{item.name}</span>
                    <span
                      className={`shrink-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded border ${style.color}`}
                    >
                      {style.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 mt-0.5">
                    {item.source &&
                      SOURCE_STYLES[item.source].map((s) => (
                        <span
                          key={s.label}
                          className={`shrink-0 px-1.5 py-px text-[10px] rounded border ${s.color}`}
                        >
                          {s.label}
                        </span>
                      ))}
                    {item.note && (
                      <span className="text-[10px] text-muted truncate">{item.note}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 全スキル詳細（折りたたみ） */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-muted hover:text-foreground transition-colors select-none mb-4">
            ▶ 全スキル詳細を表示
          </summary>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCategories.map((cat) => (
              <div key={cat.category} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="text-sm font-bold text-accent mb-3">{cat.category}</h3>
                <div className="space-y-2.5">
                  {cat.items.map((item) => {
                    const style = LEVEL_STYLES[item.level];
                    return (
                      <div key={item.name} className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex items-center gap-2">
                          <span
                            className={`shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded border ${style.color}`}
                          >
                            {style.label}
                          </span>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="shrink-0 flex flex-wrap items-center justify-end gap-1">
                          {item.source &&
                            SOURCE_STYLES[item.source].map((s) => (
                              <span
                                key={s.label}
                                className={`shrink-0 px-1.5 py-px text-[10px] rounded border ${s.color}`}
                              >
                                {s.label}
                              </span>
                            ))}
                          {item.note && (
                            <span className="text-[10px] text-muted">{item.note}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* 対応可能な業務 */}
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">対応可能な業務</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'フルスタック開発（フロントエンド軸）',
                items: ['React / Next.js / TypeScript', 'Firebase / Supabase バックエンド・認証・DB設計', 'Stripe 決済基盤', 'Recharts データ可視化・統計分析'],
                strong: true,
              },
              {
                title: 'インフラ / クラウド',
                items: ['AWS（Lambda / DynamoDB / CloudWatch）', 'Vercel / Firebase / PWA・モバイル対応'],
              },
              {
                title: '設計 / 品質管理',
                items: ['要件定義〜詳細設計〜テスト — 全工程一貫対応', 'CI/CD（GitHub Actions / CircleCI）', 'セキュリティレビュー（11件の脆弱性修正実績）'],
              },
              {
                title: 'AI駆動開発',
                items: ['Claude Code — 設計〜実装〜テストをAIと協働', 'アジャイル（スクラム）・REST API設計'],
              },
            ].map((service) => (
              <div
                key={service.title}
                className={`p-4 rounded-xl bg-card border transition-colors ${
                  service.strong
                    ? 'border-accent/40 ring-1 ring-accent/10'
                    : 'border-border'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-sm">{service.title}</h4>
                  {service.strong && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                      得意領域
                    </span>
                  )}
                </div>
                <ul className="space-y-1">
                  {service.items.map((item) => (
                    <li key={item} className="text-xs text-muted flex items-start gap-1.5">
                      <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 開発プラクティス */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">開発プラクティス</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: 'CI/CD', badge: '4段階ゲート' },
              { title: 'テスト自動化', badge: '164テスト' },
              { title: '設計ドキュメント', badge: '10本整備' },
              { title: 'セキュリティ', badge: '11件修正' },
              { title: 'エラー監視', badge: 'Sentry' },
              { title: '依存関係管理', badge: '週次15件' },
              { title: 'コードレビュー', badge: '実務経験' },
            ].map((p) => (
              <div
                key={p.title}
                className="p-3 rounded-lg bg-card border border-border text-center"
              >
                <p className="text-xs font-bold mb-1">{p.title}</p>
                <span className="text-[10px] text-accent font-bold">{p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
