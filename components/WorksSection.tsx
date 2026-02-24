'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';

interface ScaleItem {
  value: string;
  label: string;
}

interface Screenshot {
  src: string;
  caption: string;
  fit?: 'contain' | 'cover';
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
  images?: Screenshot[];
  status?: 'released' | 'in-dev' | 'testing';
}

const WORKS: Work[] = [
  {
    title: 'darts Lab',
    period: '2025/12 〜 運用継続中',
    description:
      'ダーツプレイヤー向けのセッティング管理・スタッツ連携・バレル探索・コミュニティWebアプリ。DARTSLIVEアカウント連携でスタッツを自動取得し、ピアソン相関・線形回帰など多彩な統計分析で成長を可視化。',
    motivation:
      '自身がダーツのプロ選手として活動してきた経験から、セッティング管理の煩雑さ・スタッツの可視化不足・バレル選びの情報分散といった課題を解決するために企画・開発。',
    differentiation: [
      '既存アプリはスタッツ閲覧のみ → 相関分析・回帰分析・レーティングモメンタムなど統計的な深掘りが可能',
      'セッティング管理・バレル探索・ショップ検索が別々のサービスに分散 → 1つのアプリに統合',
      '公式アプリにないXP/ランクシステム・アワードでモチベーション維持を設計',
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
    ],
    highlights: [
      'フルサーバーレス構成 — フロント〜認証・課金〜インフラまで全工程を一人で完遂',
      'AI駆動開発 — Claude Codeで設計〜実装〜テストを協働。設計ドキュメント10本もAIと整備',
      '3段階SaaSモデル（一般/Pro/管理者）— Stripe Subscription + NextAuth + Firebase Auth のロールベース制御',
      'ピアソン相関・線形回帰・レーティングモメンタムなど統計分析をフロントで実装',
      'Puppeteer + Vercel Cron（毎日JST 10:00）でDARTSLIVEスタッツを自動収集',
      'セキュリティレビュー実施 — Firestoreフィールド制限・レートリミット(60req/min)・SSRF対策・CSV Injection対策',
    ],
    features: [
      'DARTSLIVEアカウント連携・スタッツ自動取得・統計グラフ（Recharts）',
      '7,000種以上のバレルDB・SVGベジエ曲線シミュレーター・100点スコアリングのレコメンドエンジン',
      'XP/ランクシステム（14種のXPルール・30段階）・12種のアワード',
      'OGP画像生成（Edge Runtime）・LINE Flex Messageで週次/月次レポート自動配信',
      'アフィリエイト基盤（6ショップ）・PWA（Serwist）・Capacitor iOS対応',
      'Vitest 158テスト・GitHub Actions CI/CD・Sentryエラー監視',
    ],
    scale: [
      { value: '198', label: 'コミット' },
      { value: '39', label: 'ページ' },
      { value: '106', label: 'コンポーネント' },
      { value: '44,000+', label: '行（TS）' },
      { value: '7,000+', label: 'バレルDB' },
      { value: '158', label: 'テスト' },
      { value: '10', label: '設計書' },
    ],
    images: [
      { src: '/home.png', caption: 'ダッシュボード', fit: 'cover' },
      { src: '/countup.png', caption: 'COUNT-UP 深掘り分析', fit: 'contain' },
      { src: '/heatmap.png', caption: 'ダーツボードヒートマップ', fit: 'contain' },
      { src: '/barrel-quiz.png', caption: 'バレル診断クイズ', fit: 'contain' },
      { src: '/setting-compare.png', caption: 'セッティング比較', fit: 'contain' },
      { src: '/barrel-recommend.jpeg', caption: 'おすすめバレル探索', fit: 'contain' },
    ],
    url: 'https://darts-app-lime.vercel.app',
    github: 'https://github.com/seiryuu1215/darts-app',
    status: 'released',
  },
  {
    title: 'MonkMode — 筋トレ・食事管理',
    period: '2026/2 〜 開発中',
    description:
      '「修行僧のようにストイックに鍛える」をコンセプトにした筋トレ・食事管理アプリ。あえて機能を絞り、ストイックなユーザー向けに特化することで差別化。ダーツ練習日を保護する適応型スケジューラーで、ダーツと筋トレの両立を実現。',
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
              : 'h-[420px] object-cover object-top'
          }`}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="前の画像"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="次の画像"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorksSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="personal" label="Personal Projects" title="個人開発" />

        <div className="space-y-16">
          {WORKS.map((work) => (
            <div key={work.title} className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* ヘッダー */}
              <div className="p-5 pb-0 flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold">{work.title}</h3>
                {work.status === 'released' && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                    運用中
                  </span>
                )}
                {work.status === 'in-dev' && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium">
                    開発中
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                      <p className="text-xs text-accent font-medium mb-1.5">既存サービスとの差別化</p>
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

                  {/* ハイライト + 機能 2カラム */}
                  <div className="grid sm:grid-cols-2 gap-4">
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
                    {work.features && (
                      <div>
                        <p className="text-sm font-medium mb-2">主な機能</p>
                        <ul className="space-y-1">
                          {work.features.map((f) => (
                            <li key={f} className="text-xs text-muted flex items-start gap-1.5">
                              <span className="text-muted mt-0.5 shrink-0">-</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 規模 + タグ */}
                  {work.scale && (
                    <div className="flex flex-wrap gap-2">
                      {work.scale.map((s) => (
                        <div key={s.label} className="text-center px-3 py-1.5 rounded-lg bg-background border border-border min-w-[60px]">
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
        </div>
      </div>
    </section>
  );
}
