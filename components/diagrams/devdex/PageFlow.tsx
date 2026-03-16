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
  blue: '#38bdf8',
  green: '#3ecf8e',
  amber: '#fbbf24',
  purple: '#a78bfa',
  pink: '#f472b6',
  cyan: '#22d3ee',
};

interface PageNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  path: string;
  color: string;
  detail: string;
}

interface FlowArrow {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  color?: string;
}

const unauthPages: PageNode[] = [
  {
    id: 'lp',
    x: 40,
    y: 40,
    w: 120,
    h: 48,
    label: 'LP /',
    path: '/',
    color: C.blue,
    detail: 'ランディングページ。機能紹介・CTAでログイン/診断に誘導',
  },
  {
    id: 'diagnosis',
    x: 200,
    y: 40,
    w: 140,
    h: 48,
    label: 'Diagnosis',
    path: '/diagnosis',
    color: C.purple,
    detail: 'エンジニアタイプ診断 (64問)。登録不要で受診可能',
  },
  {
    id: 'result',
    x: 380,
    y: 40,
    w: 150,
    h: 48,
    label: 'Result/[type]',
    path: '/diagnosis/result/[type]',
    color: C.purple,
    detail: '診断結果表示。SNSシェアボタンでOGP画像付きシェア',
  },
  {
    id: 'sns',
    x: 570,
    y: 40,
    w: 100,
    h: 48,
    label: 'SNS Share',
    path: 'SNS',
    color: C.pink,
    detail: 'X/LINE等でシェア。OGP画像付きリンクで新規ユーザーを獲得',
  },
  {
    id: 'login',
    x: 40,
    y: 130,
    w: 120,
    h: 48,
    label: 'Login',
    path: '/auth/login',
    color: C.green,
    detail: 'Supabase Auth ログイン画面',
  },
  {
    id: 'onboarding',
    x: 200,
    y: 130,
    w: 140,
    h: 48,
    label: 'Onboarding',
    path: '/onboarding/survey',
    color: C.amber,
    detail: 'オンボーディングアンケート。初回ログイン時に表示',
  },
];

const unauthArrows: FlowArrow[] = [
  { from: 'lp', to: 'diagnosis', label: '診断開始' },
  { from: 'diagnosis', to: 'result', label: '64問回答' },
  { from: 'result', to: 'sns', label: 'シェア', color: C.pink },
  { from: 'sns', to: 'lp', label: '新規流入', dashed: true, color: C.pink },
  { from: 'lp', to: 'login', label: 'ログイン' },
  { from: 'login', to: 'onboarding', label: '初回' },
];

const authPages: PageNode[] = [
  {
    id: 'dash',
    x: 40,
    y: 40,
    w: 130,
    h: 48,
    label: 'Dashboard /',
    path: '/',
    color: C.blue,
    detail: 'レベル・キャラ・レーダーチャート・ピン留め用語・統計カード',
  },
  {
    id: 'terms',
    x: 210,
    y: 40,
    w: 130,
    h: 48,
    label: 'Terms',
    path: '/terms',
    color: C.green,
    detail: '用語一覧。カテゴリフィルター・習熟度ソート・検索',
  },
  {
    id: 'termDetail',
    x: 380,
    y: 40,
    w: 130,
    h: 48,
    label: 'Terms/[id]',
    path: '/terms/[id]',
    color: C.green,
    detail: '用語詳細・編集。AI概要補完・関連用語・親子関係',
  },
  {
    id: 'extract',
    x: 380,
    y: 130,
    w: 130,
    h: 48,
    label: 'Extract',
    path: '/extract',
    color: C.amber,
    detail: '長文貼り付けからIT用語を一括抽出・登録',
  },
  {
    id: 'growth',
    x: 40,
    y: 130,
    w: 130,
    h: 48,
    label: 'Growth',
    path: '/growth',
    color: C.cyan,
    detail: '成長ログ画面。活動履歴・レベルアップ記録',
  },
  {
    id: 'interview',
    x: 210,
    y: 130,
    w: 130,
    h: 48,
    label: 'Interview Sim',
    path: '/interview-sim',
    color: C.purple,
    detail: 'AI面談シミュレーター (Pro限定)。チャット形式で面談練習',
  },
  {
    id: 'skillsheet',
    x: 550,
    y: 40,
    w: 130,
    h: 48,
    label: 'Skillsheet',
    path: '/skillsheet',
    color: C.cyan,
    detail: 'スキルシート管理。案件登録・Excel/PDF出力・インポート',
  },
  {
    id: 'settings',
    x: 40,
    y: 220,
    w: 130,
    h: 48,
    label: 'Settings',
    path: '/settings',
    color: C.textMuted,
    detail: 'プロフィール設定・パスワード変更・退会',
  },
  {
    id: 'pricing',
    x: 210,
    y: 220,
    w: 130,
    h: 48,
    label: 'Pricing',
    path: '/pricing',
    color: C.pink,
    detail: '料金プラン比較。Free/Pro/Enterprise。Stripe Checkout',
  },
];

const authArrows: FlowArrow[] = [
  { from: 'dash', to: 'terms' },
  { from: 'terms', to: 'termDetail' },
  { from: 'terms', to: 'extract', dashed: true },
  { from: 'dash', to: 'growth' },
  { from: 'dash', to: 'interview', dashed: true },
  { from: 'termDetail', to: 'skillsheet', dashed: true },
  { from: 'pricing', to: 'dash', label: 'Stripe', color: C.pink, dashed: true },
];

const publicPages: PageNode[] = [
  {
    id: 'profile',
    x: 40,
    y: 40,
    w: 160,
    h: 48,
    label: '/[username]',
    path: '/[username]',
    color: C.blue,
    detail: '公開プロフィール。キャラ・レーダーチャート・ピン留め用語',
  },
  {
    id: 'pubSkill',
    x: 250,
    y: 40,
    w: 200,
    h: 48,
    label: '/[username]/skillsheet',
    path: '/[username]/skillsheet',
    color: C.cyan,
    detail: '公開スキルシート。案件・使用技術を外部に公開 (Pro限定)',
  },
];

function PageBox({
  page,
  isActive,
  onClick,
}: {
  page: PageNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const show = hov || isActive;
  return (
    <g
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {show && (
        <rect
          x={page.x - 3}
          y={page.y - 3}
          width={page.w + 6}
          height={page.h + 6}
          rx={12}
          fill="none"
          stroke={page.color}
          strokeWidth={1.5}
          opacity={0.4}
        />
      )}
      <rect
        x={page.x}
        y={page.y}
        width={page.w}
        height={page.h}
        rx={10}
        fill={show ? C.surfaceHover : C.surface}
        stroke={show ? page.color : C.border}
        strokeWidth={show ? 1.5 : 1}
      />
      <rect
        x={page.x}
        y={page.y}
        width={page.w}
        height={page.h}
        rx={10}
        fill={page.color}
        opacity={show ? 0.12 : 0.05}
      />
      <text
        x={page.x + page.w / 2}
        y={page.y + 22}
        textAnchor="middle"
        fill={C.text}
        fontSize={11}
        fontWeight={600}
        fontFamily="'JetBrains Mono',monospace"
      >
        {page.label}
      </text>
      <text
        x={page.x + page.w / 2}
        y={page.y + 38}
        textAnchor="middle"
        fill={C.textDim}
        fontSize={8}
        fontFamily="'JetBrains Mono',monospace"
      >
        {page.path}
      </text>
    </g>
  );
}

function FlowArrowLine({ arrow, pages }: { arrow: FlowArrow; pages: PageNode[] }) {
  const from = pages.find((p) => p.id === arrow.from);
  const to = pages.find((p) => p.id === arrow.to);
  if (!from || !to) return null;

  const fx = from.x + from.w;
  const fy = from.y + from.h / 2;
  const tx = to.x;
  const ty = to.y + to.h / 2;
  const color = arrow.color || C.textDim;

  // If to is below, go from bottom
  const goDown = ty > fy + 20;
  const sx = goDown ? from.x + from.w / 2 : fx;
  const sy = goDown ? from.y + from.h : fy;
  const ex = goDown ? to.x + to.w / 2 : tx;
  const ey = goDown ? to.y : ty;

  // If to is to the left (loopback)
  const goLeft = to.x + to.w < from.x;
  if (goLeft) {
    const lsx = from.x;
    const lsy = fy;
    const lex = to.x + to.w;
    const ley = ty;
    const midY = Math.max(lsy, ley) + 30;
    return (
      <g>
        <path
          d={`M ${lsx} ${lsy} L ${lsx - 15} ${lsy} L ${lsx - 15} ${midY} L ${lex + 15} ${midY} L ${lex + 15} ${ley} L ${lex} ${ley}`}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray={arrow.dashed ? '4,3' : 'none'}
          opacity={0.4}
        />
        <polygon
          points={`${lex},${ley} ${lex + 6},${ley - 3} ${lex + 6},${ley + 3}`}
          fill={color}
          opacity={0.5}
        />
        {arrow.label && (
          <text
            x={lsx - 15}
            y={midY - 4}
            textAnchor="middle"
            fill={color}
            fontSize={8}
            fontFamily="'JetBrains Mono',monospace"
            opacity={0.7}
          >
            {arrow.label}
          </text>
        )}
      </g>
    );
  }

  return (
    <g>
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={color}
        strokeWidth={1}
        strokeDasharray={arrow.dashed ? '4,3' : 'none'}
        opacity={0.4}
      />
      {goDown ? (
        <polygon
          points={`${ex},${ey} ${ex - 3},${ey - 6} ${ex + 3},${ey - 6}`}
          fill={color}
          opacity={0.5}
        />
      ) : (
        <polygon
          points={`${ex},${ey} ${ex - 6},${ey - 3} ${ex - 6},${ey + 3}`}
          fill={color}
          opacity={0.5}
        />
      )}
      {arrow.label && (
        <text
          x={(sx + ex) / 2}
          y={(sy + ey) / 2 - 6}
          textAnchor="middle"
          fill={color}
          fontSize={8}
          fontFamily="'JetBrains Mono',monospace"
          opacity={0.7}
        >
          {arrow.label}
        </text>
      )}
    </g>
  );
}

export default function DevDexPageFlow() {
  const [activePage, setActivePage] = useState<PageNode | null>(null);

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.blue }}>&#128241;</span> DevDex - Page Flow
        </h2>
        <p style={{ color: C.textDim, fontSize: 11, margin: '6px 0 0', letterSpacing: '0.1em' }}>
          33 PAGES / 3 FLOW ZONES: UNAUTHENTICATED / AUTHENTICATED / PUBLIC
        </p>
      </div>

      {/* Unauth flow */}
      <div style={{ maxWidth: 720, margin: '0 auto 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: C.pink, opacity: 0.8 }} />
          <span style={{ color: C.pink, fontSize: 11, fontWeight: 600 }}>UNAUTHENTICATED FLOW</span>
          <span style={{ color: C.textDim, fontSize: 9 }}>
            --- 集客ファネル: 診断 &gt; シェア &gt; 登録
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 700 200" width="100%" style={{ overflow: 'visible' }}>
            <rect
              width="700"
              height="200"
              rx={12}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={0.5}
            />
            {unauthArrows.map((a, i) => (
              <FlowArrowLine key={i} arrow={a} pages={unauthPages} />
            ))}
            {unauthPages.map((p) => (
              <PageBox
                key={p.id}
                page={p}
                isActive={activePage?.id === p.id}
                onClick={() => setActivePage(activePage?.id === p.id ? null : p)}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Auth flow */}
      <div style={{ maxWidth: 720, margin: '0 auto 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div
            style={{ width: 8, height: 8, borderRadius: 2, background: C.green, opacity: 0.8 }}
          />
          <span style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>AUTHENTICATED FLOW</span>
          <span style={{ color: C.textDim, fontSize: 9 }}>--- ログイン後のメイン導線</span>
        </div>
        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 720 290" width="100%" style={{ overflow: 'visible' }}>
            <rect
              width="720"
              height="290"
              rx={12}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={0.5}
            />
            {authArrows.map((a, i) => (
              <FlowArrowLine key={i} arrow={a} pages={authPages} />
            ))}
            {authPages.map((p) => (
              <PageBox
                key={p.id}
                page={p}
                isActive={activePage?.id === p.id}
                onClick={() => setActivePage(activePage?.id === p.id ? null : p)}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Public pages */}
      <div style={{ maxWidth: 720, margin: '0 auto 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: C.cyan, opacity: 0.8 }} />
          <span style={{ color: C.cyan, fontSize: 11, fontWeight: 600 }}>PUBLIC PAGES</span>
          <span style={{ color: C.textDim, fontSize: 9 }}>--- 認証不要の公開ページ</span>
        </div>
        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 500 110" width="100%" style={{ overflow: 'visible' }}>
            <rect
              width="500"
              height="110"
              rx={12}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={0.5}
            />
            {publicPages.map((p) => (
              <PageBox
                key={p.id}
                page={p}
                isActive={activePage?.id === p.id}
                onClick={() => setActivePage(activePage?.id === p.id ? null : p)}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Detail panel */}
      {activePage && (
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            background: C.surface,
            border: `1px solid ${activePage.color}`,
            borderRadius: 12,
            padding: '14px 18px',
            boxShadow: `0 0 24px rgba(0,0,0,0.4)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                color: activePage.color,
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {activePage.label}
            </span>
            <span
              onClick={() => setActivePage(null)}
              style={{ color: C.textDim, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
            >
              x
            </span>
          </div>
          <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.7 }}>
            <div>
              <span style={{ color: C.text, fontWeight: 600 }}>Path: </span>
              {activePage.path}
            </div>
            <div style={{ marginTop: 4 }}>{activePage.detail}</div>
          </div>
        </div>
      )}

      <p
        style={{ color: C.textDim, fontSize: 10, textAlign: 'center', marginTop: 16, opacity: 0.5 }}
      >
        ※ 各ページをクリックすると詳細が表示されます | 33 pages / 3 flow zones
      </p>
    </div>
  );
}
