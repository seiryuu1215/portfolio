'use client';

import { useState } from 'react';

const C: Record<string, string> = {
  bg: '#0a0e1a',
  surface: '#111827',
  surfaceHover: '#1a2332',
  border: '#1e293b',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  accent: '#38bdf8',
  accentGlow: 'rgba(56,189,248,0.15)',
  supabase: '#3ecf8e',
  supabaseGlow: 'rgba(62,207,142,0.12)',
  vercel: '#ffffff',
  vercelGlow: 'rgba(255,255,255,0.08)',
  anthropic: '#d4a574',
  anthropicGlow: 'rgba(212,165,116,0.12)',
  stripe: '#635bff',
  stripeGlow: 'rgba(99,91,255,0.12)',
  fal: '#f472b6',
  falGlow: 'rgba(244,114,182,0.12)',
  green: '#34d399',
  greenGlow: 'rgba(52,211,153,0.12)',
};

interface NodeBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string;
  label: string;
  sublabel?: string;
  color: string;
  glowColor?: string;
  onClick?: () => void;
  isActive?: boolean;
}

function NodeBox({
  x,
  y,
  width,
  height,
  icon,
  label,
  sublabel,
  color,
  glowColor,
  onClick,
  isActive,
}: NodeBoxProps) {
  const [hovered, setHovered] = useState(false);
  const show = hovered || isActive;
  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {show && (
        <rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx={16}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.4}
        />
      )}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill={show ? C.surfaceHover : C.surface}
        stroke={show ? color : C.border}
        strokeWidth={show ? 1.5 : 1}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill={glowColor || 'transparent'}
        opacity={show ? 0.5 : 0}
      />
      <text
        x={x + width / 2}
        y={y + (sublabel ? height / 2 - 6 : height / 2 + 1)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={C.text}
        fontSize={13}
        fontWeight={600}
        fontFamily="'JetBrains Mono','SF Mono',monospace"
      >
        {icon} {label}
      </text>
      {sublabel && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={C.textDim}
          fontSize={10}
          fontFamily="'JetBrains Mono','SF Mono',monospace"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = C.textDim,
  label,
  dashed,
  bidirectional,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  label?: string;
  dashed?: boolean;
  bidirectional?: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const aL = 8;
  const h1x = x2 - aL * Math.cos(angle - Math.PI / 6);
  const h1y = y2 - aL * Math.sin(angle - Math.PI / 6);
  const h2x = x2 - aL * Math.cos(angle + Math.PI / 6);
  const h2y = y2 - aL * Math.sin(angle + Math.PI / 6);

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? '6,4' : 'none'}
        opacity={0.5}
      />
      <polygon points={`${x2},${y2} ${h1x},${h1y} ${h2x},${h2y}`} fill={color} opacity={0.6} />
      {bidirectional &&
        (() => {
          const ra = angle + Math.PI;
          const r1x = x1 - aL * Math.cos(ra - Math.PI / 6);
          const r1y = y1 - aL * Math.sin(ra - Math.PI / 6);
          const r2x = x1 - aL * Math.cos(ra + Math.PI / 6);
          const r2y = y1 - aL * Math.sin(ra + Math.PI / 6);
          return (
            <polygon
              points={`${x1},${y1} ${r1x},${r1y} ${r2x},${r2y}`}
              fill={color}
              opacity={0.6}
            />
          );
        })()}
      {label && (
        <g>
          <rect
            x={midX - label.length * 3.2 - 6}
            y={midY - 8}
            width={label.length * 6.4 + 12}
            height={16}
            rx={4}
            fill={C.bg}
            opacity={0.9}
          />
          <text
            x={midX}
            y={midY + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

function GroupBox({
  x,
  y,
  width,
  height,
  label,
  color,
  icon,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
  icon: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={16}
        fill="none"
        stroke={color}
        strokeWidth={1}
        strokeDasharray="8,4"
        opacity={0.25}
      />
      <rect x={x} y={y} width={width} height={height} rx={16} fill={color} opacity={0.03} />
      <text
        x={x + 14}
        y={y + 20}
        fill={color}
        fontSize={11}
        fontWeight={700}
        fontFamily="'JetBrains Mono',monospace"
        opacity={0.7}
        letterSpacing="0.08em"
      >
        {icon} {label}
      </text>
    </g>
  );
}

interface ActiveNode {
  id: string;
  icon: string;
  label: string;
  color: string;
  glowColor: string;
  detail: string;
}

function DetailPanel({ node, onClose }: { node: ActiveNode | null; onClose: () => void }) {
  if (!node) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: C.surface,
        border: `1px solid ${node.color}`,
        borderRadius: 12,
        padding: '16px 20px',
        maxWidth: 520,
        width: '90%',
        boxShadow: `0 0 30px ${node.glowColor}`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            color: node.color,
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          {node.icon} {node.label}
        </span>
        <span
          onClick={onClose}
          style={{ color: C.textDim, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
        >
          x
        </span>
      </div>
      <p
        style={{
          color: C.textMuted,
          fontSize: 12,
          lineHeight: 1.7,
          margin: 0,
          fontFamily: "'JetBrains Mono',monospace",
        }}
      >
        {node.detail}
      </p>
    </div>
  );
}

interface NodeDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
  detail: string;
}

const nodes: NodeDef[] = [
  {
    id: 'nextjs',
    x: 60,
    y: 70,
    w: 170,
    h: 52,
    icon: '&#9889;',
    label: 'Next.js 16',
    sublabel: 'App Router + React 19',
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'App Router + Server Components / Client Components のハイブリッド構成。データフェッチをサーバー側に集約し、APIラウンドトリップを排除。TypeScript strict モードで型安全を担保。',
  },
  {
    id: 'shadcn',
    x: 260,
    y: 70,
    w: 160,
    h: 52,
    icon: '&#127912;',
    label: 'shadcn/ui',
    sublabel: 'Tailwind CSS v4',
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'shadcn/ui + Tailwind CSS v4 でコンポーネントライブラリを構築。ダークモード対応。cn() ユーティリティでクラス結合。',
  },
  {
    id: 'recharts',
    x: 450,
    y: 70,
    w: 140,
    h: 52,
    icon: '&#128200;',
    label: 'Recharts',
    sublabel: 'dynamic import',
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'カテゴリ別レーダーチャート、レベル進捗、統計可視化。ssr: false の dynamic import で遅延読み込みし、バンドルサイズを最適化。',
  },
  {
    id: 'api',
    x: 60,
    y: 220,
    w: 160,
    h: 52,
    icon: '&#9881;',
    label: 'API Routes',
    sublabel: '63 endpoints',
    color: C.vercel,
    glow: C.vercelGlow,
    detail:
      '63 の API Routes で用語CRUD、診断、AI連携、スキルシート、Stripe Webhook、組織、通知、エンゲージメント等を提供。Serverless Functions として Vercel 上で実行。',
  },
  {
    id: 'sc',
    x: 260,
    y: 220,
    w: 160,
    h: 52,
    icon: '&#128421;',
    label: 'Server Comp.',
    sublabel: 'SSR / Streaming',
    color: C.vercel,
    glow: C.vercelGlow,
    detail:
      'Server Components でデータフェッチを実行し、HTML ストリーミングで高速表示。Suspense boundaries でプログレッシブレンダリング。',
  },
  {
    id: 'ghactions',
    x: 450,
    y: 220,
    w: 140,
    h: 52,
    icon: '&#9889;',
    label: 'CI/CD',
    sublabel: 'GitHub Actions',
    color: C.vercel,
    glow: C.vercelGlow,
    detail:
      'GitHub Actions で lint / format / test / build の4段階ゲート。Vercel Git Integration で自動デプロイ。2,063テストを CI で自動実行。',
  },
  {
    id: 'supabase-auth',
    x: 50,
    y: 380,
    w: 140,
    h: 52,
    icon: '&#128274;',
    label: 'Auth',
    sublabel: 'Supabase Auth',
    color: C.supabase,
    glow: C.supabaseGlow,
    detail:
      'Supabase Auth で JWT ベースの認証。Middleware でセッション検証し、Server Component でユーザー情報を取得。RLS ポリシーと連携。',
  },
  {
    id: 'supabase-db',
    x: 220,
    y: 380,
    w: 160,
    h: 52,
    icon: '&#128451;',
    label: 'PostgreSQL',
    sublabel: '34 migrations + RLS',
    color: C.supabase,
    glow: C.supabaseGlow,
    detail:
      'Supabase PostgreSQL に 34 マイグレーションで構築。全テーブルに RLS ポリシーを適用。profiles / terms / diagnosis_results / organizations 等のスキーマ。',
  },
  {
    id: 'supabase-storage',
    x: 410,
    y: 380,
    w: 140,
    h: 52,
    icon: '&#128230;',
    label: 'Storage',
    sublabel: 'Supabase Storage',
    color: C.supabase,
    glow: C.supabaseGlow,
    detail:
      'Supabase Storage でプロフィール画像、OGP画像を管理。バケットポリシーで認証済みユーザーのみアップロード可。',
  },
  {
    id: 'anthropic',
    x: 50,
    y: 530,
    w: 150,
    h: 52,
    icon: '&#129302;',
    label: 'Claude API',
    sublabel: 'Anthropic',
    color: C.anthropic,
    glow: C.anthropicGlow,
    detail:
      'Anthropic Claude API で AI 概要補完、長文用語抽出、面談シミュレーター、学習プラン生成、ギャップ分析の5機能を提供。Free/Pro で利用上限を差別化。',
  },
  {
    id: 'stripe',
    x: 220,
    y: 530,
    w: 130,
    h: 52,
    icon: '&#128179;',
    label: 'Stripe',
    sublabel: 'Subscription',
    color: C.stripe,
    glow: C.stripeGlow,
    detail:
      'Stripe Checkout + Customer Portal + Webhook でサブスクリプション課金。Free / Pro / Enterprise の3層モデル。Webhook で自動ロール更新。',
  },
  {
    id: 'fal',
    x: 370,
    y: 530,
    w: 130,
    h: 52,
    icon: '&#127912;',
    label: 'fal.ai',
    sublabel: 'Flux Pro',
    color: C.fal,
    glow: C.falGlow,
    detail:
      'fal.ai Flux Pro で 16 エンジニアタイプ x キャラクター画像を生成。診断結果のタイプアイコンとして OGP 画像にも使用。',
  },
  {
    id: 'vitest',
    x: 520,
    y: 530,
    w: 120,
    h: 52,
    icon: '&#129514;',
    label: 'Vitest',
    sublabel: '2,063 tests',
    color: C.green,
    glow: C.greenGlow,
    detail:
      'Vitest 4 + @testing-library/react で 2,063 テスト。ユニットテスト 145 ファイル + Playwright E2E シナリオ。CI/CD で自動実行。',
  },
];

const arrows = [
  { x1: 145, y1: 122, x2: 140, y2: 220, color: C.accent, label: 'SSR', bidirectional: true },
  { x1: 340, y1: 122, x2: 340, y2: 220, color: C.accent, label: 'hydrate', bidirectional: true },
  { x1: 520, y1: 122, x2: 520, y2: 220, color: C.accent, dashed: true },
  { x1: 120, y1: 272, x2: 120, y2: 380, color: C.supabase, label: 'JWT' },
  { x1: 300, y1: 272, x2: 300, y2: 380, color: C.supabase, label: 'CRUD', bidirectional: true },
  { x1: 480, y1: 272, x2: 480, y2: 380, color: C.supabase, label: 'Upload' },
  { x1: 100, y1: 272, x2: 125, y2: 530, color: C.anthropic, label: 'AI', dashed: true },
  { x1: 260, y1: 272, x2: 285, y2: 530, color: C.stripe, label: 'Webhook' },
  { x1: 380, y1: 272, x2: 435, y2: 530, color: C.fal, label: 'Generate', dashed: true },
  { x1: 520, y1: 272, x2: 580, y2: 530, color: C.green, dashed: true },
];

export default function DevDexArchitecture() {
  const [activeNode, setActiveNode] = useState<ActiveNode | null>(null);

  const handleClick = (n: NodeDef) => {
    setActiveNode(
      activeNode?.id === n.id
        ? null
        : {
            id: n.id,
            icon: n.icon,
            label: n.label,
            color: n.color,
            glowColor: n.glow,
            detail: n.detail,
          },
    );
  };

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono','SF Mono','Fira Code',monospace",
        position: 'relative',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <h2
          style={{
            color: C.text,
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: C.accent }}>&#128218;</span> DevDex
        </h2>
        <p
          style={{
            color: C.textDim,
            fontSize: 12,
            margin: '6px 0 0',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          System Architecture
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 24,
          maxWidth: 600,
          margin: '0 auto 24px',
        }}
      >
        {[
          'Next.js 16',
          'TypeScript',
          'Supabase',
          'Anthropic API',
          'Stripe',
          'Vercel',
          'shadcn/ui',
          'Recharts',
        ].map((t) => (
          <span
            key={t}
            style={{
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.2)',
              color: C.accent,
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 700, margin: '0 auto' }}>
        <svg viewBox="0 0 700 610" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="devdex-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="700" height="610" fill="url(#devdex-grid)" opacity="0.5" />

          <GroupBox
            x={30}
            y={42}
            width={590}
            height={98}
            label="CLIENT LAYER"
            color={C.accent}
            icon="&#128187;"
          />
          <GroupBox
            x={30}
            y={192}
            width={590}
            height={98}
            label="VERCEL PLATFORM"
            color={C.vercel}
            icon="&#9650;"
          />
          <GroupBox
            x={20}
            y={350}
            width={560}
            height={100}
            label="SUPABASE"
            color={C.supabase}
            icon="&#9889;"
          />
          <GroupBox
            x={20}
            y={502}
            width={650}
            height={98}
            label="EXTERNAL SERVICES"
            color={C.anthropic}
            icon="&#128279;"
          />

          {arrows.map((a, i) => (
            <Arrow key={i} {...a} />
          ))}

          {nodes.map((n) => (
            <NodeBox
              key={n.id}
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              icon={n.icon}
              label={n.label}
              sublabel={n.sublabel}
              color={n.color}
              glowColor={n.glow}
              isActive={activeNode?.id === n.id}
              onClick={() => handleClick(n)}
            />
          ))}
        </svg>

        <DetailPanel node={activeNode} onClose={() => setActiveNode(null)} />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 20,
          padding: '12px 20px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${C.border}`,
        }}
      >
        {[
          { color: C.accent, label: 'Client' },
          { color: C.vercel, label: 'Vercel' },
          { color: C.supabase, label: 'Supabase' },
          { color: C.anthropic, label: 'AI' },
          { color: C.stripe, label: 'Payment' },
          { color: C.fal, label: 'Image Gen' },
          { color: C.green, label: 'Testing' },
        ].map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{ width: 10, height: 10, borderRadius: 3, background: l.color, opacity: 0.8 }}
            />
            <span style={{ color: C.textDim, fontSize: 10 }}>{l.label}</span>
          </div>
        ))}
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, marginTop: 12, opacity: 0.5, textAlign: 'center' }}
      >
        ※ 各ノードをクリックすると詳細が表示されます
      </p>
    </div>
  );
}
