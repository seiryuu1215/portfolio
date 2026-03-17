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
  red: '#f87171',
};

interface ApiGroup {
  id: string;
  icon: string;
  label: string;
  color: string;
  endpoints: { method: string; path: string; desc: string }[];
}

const apiGroups: ApiGroup[] = [
  {
    id: 'terms',
    icon: '&#128214;',
    label: 'Terms',
    color: C.green,
    endpoints: [
      { method: 'GET', path: '/api/terms', desc: '用語一覧取得' },
      { method: 'POST', path: '/api/terms', desc: '用語登録' },
      { method: 'PUT', path: '/api/terms/[id]', desc: '用語更新' },
      { method: 'DELETE', path: '/api/terms/[id]', desc: '用語削除' },
      { method: 'POST', path: '/api/terms/[id]/pin', desc: 'ピン留め切替' },
      { method: 'POST', path: '/api/terms/[id]/watch', desc: 'ウォッチ切替' },
      { method: 'GET', path: '/api/terms/search', desc: '用語検索' },
    ],
  },
  {
    id: 'diagnosis',
    icon: '&#128300;',
    label: 'Diagnosis',
    color: C.purple,
    endpoints: [
      { method: 'POST', path: '/api/diagnosis', desc: '診断結果保存' },
      { method: 'GET', path: '/api/diagnosis/result/[type]', desc: 'タイプ別結果取得' },
      { method: 'POST', path: '/api/diagnosis/interpersonal', desc: '対人スタイル診断保存' },
      { method: 'GET', path: '/api/diagnosis/types', desc: '全16タイプ一覧' },
    ],
  },
  {
    id: 'ai',
    icon: '&#129302;',
    label: 'AI Integration',
    color: C.amber,
    endpoints: [
      { method: 'POST', path: '/api/extract', desc: '長文から用語一括抽出' },
      { method: 'POST', path: '/api/ai-overview', desc: 'AI概要補完' },
      { method: 'POST', path: '/api/interview-sim/start', desc: '面談シミュレーター開始' },
      { method: 'POST', path: '/api/interview-sim/message', desc: 'チャットメッセージ送信' },
      { method: 'POST', path: '/api/learning-plan', desc: 'AI学習プラン生成' },
      { method: 'POST', path: '/api/gap-analysis', desc: 'ギャップ分析' },
    ],
  },
  {
    id: 'skillsheet',
    icon: '&#128196;',
    label: 'Skillsheet',
    color: C.cyan,
    endpoints: [
      { method: 'GET', path: '/api/skillsheet', desc: '案件一覧' },
      { method: 'POST', path: '/api/skillsheet', desc: '案件登録' },
      { method: 'GET', path: '/api/skillsheet/export/excel', desc: 'Excel出力' },
      { method: 'GET', path: '/api/skillsheet/export/pdf', desc: 'PDF出力' },
      { method: 'POST', path: '/api/skillsheet/import/excel', desc: 'Excelインポート (AI解析)' },
    ],
  },
  {
    id: 'stripe',
    icon: '&#128179;',
    label: 'Payment',
    color: C.pink,
    endpoints: [
      { method: 'POST', path: '/api/stripe/checkout', desc: 'Checkout Session作成' },
      { method: 'POST', path: '/api/stripe/portal', desc: 'Customer Portal URL' },
      { method: 'POST', path: '/api/stripe/webhook', desc: 'Webhook受信 (4イベント)' },
    ],
  },
  {
    id: 'org',
    icon: '&#127970;',
    label: 'Organization',
    color: C.amber,
    endpoints: [
      { method: 'POST', path: '/api/org', desc: '組織作成' },
      { method: 'GET', path: '/api/org/[id]/members', desc: 'メンバー一覧' },
      { method: 'POST', path: '/api/org/[id]/search', desc: '候補者検索' },
      { method: 'POST', path: '/api/org/[id]/bookmark', desc: 'ブックマーク' },
    ],
  },
  {
    id: 'misc',
    icon: '&#9881;',
    label: 'Profile / Notifications / Survey',
    color: C.blue,
    endpoints: [
      { method: 'GET', path: '/api/profile', desc: 'プロフィール取得' },
      { method: 'PUT', path: '/api/profile', desc: 'プロフィール更新' },
      { method: 'GET', path: '/api/notifications', desc: '通知一覧' },
      { method: 'POST', path: '/api/engagement', desc: 'エンゲージメント送信' },
      { method: 'POST', path: '/api/survey', desc: 'アンケート回答' },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: C.green,
  POST: C.blue,
  PUT: C.amber,
  DELETE: C.red,
};

export default function DevDexApiDataFlow() {
  const [activeGroup, setActiveGroup] = useState<string>('terms');

  const totalEndpoints = apiGroups.reduce((sum, g) => sum + g.endpoints.length, 0);

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.blue }}>&#128260;</span> DevDex - API Routes
        </h2>
        <p style={{ color: C.textDim, fontSize: 11, margin: '6px 0 0', letterSpacing: '0.1em' }}>
          {totalEndpoints} ENDPOINTS / NEXT.JS APP ROUTER API ROUTES
        </p>
      </div>

      {/* Group selector */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 24,
          maxWidth: 700,
          margin: '0 auto 24px',
        }}
      >
        {apiGroups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              border: `1px solid ${activeGroup === g.id ? g.color : C.border}`,
              background: activeGroup === g.id ? `${g.color}10` : C.surface,
              color: activeGroup === g.id ? g.color : C.textMuted,
              fontSize: 10,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono',monospace",
              transition: 'all 0.2s',
            }}
          >
            {g.icon} {g.label}
            <span style={{ marginLeft: 4, opacity: 0.6 }}>({g.endpoints.length})</span>
          </button>
        ))}
      </div>

      {/* Active group endpoints */}
      {apiGroups
        .filter((g) => g.id === activeGroup)
        .map((group) => (
          <div
            key={group.id}
            style={{
              maxWidth: 700,
              margin: '0 auto',
              background: C.surface,
              border: `1px solid ${group.color}`,
              borderRadius: 12,
              padding: '20px 24px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)',
            }}
          >
            <h3
              style={{
                color: group.color,
                fontSize: 14,
                fontWeight: 700,
                margin: '0 0 16px',
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {group.icon} {group.label}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.endpoints.map((ep) => (
                <div
                  key={ep.path + ep.method}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: `${methodColors[ep.method]}15`,
                      color: methodColors[ep.method],
                      fontSize: 9,
                      fontWeight: 700,
                      minWidth: 42,
                      textAlign: 'center',
                    }}
                  >
                    {ep.method}
                  </span>
                  <span style={{ color: C.text, fontSize: 11, flex: 1 }}>{ep.path}</span>
                  <span style={{ color: C.textDim, fontSize: 10 }}>{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Data flow summary */}
      <div style={{ maxWidth: 700, margin: '24px auto 0' }}>
        <svg viewBox="0 0 700 120" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="api-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="700" height="120" fill="url(#api-grid)" opacity="0.5" />

          {[
            { x: 20, label: 'Client', sub: 'React', color: C.blue },
            { x: 180, label: 'API Route', sub: 'Validation', color: C.green },
            { x: 340, label: 'Supabase', sub: 'RLS Check', color: C.green },
            { x: 500, label: 'Response', sub: 'JSON', color: C.amber },
          ].map((box, i) => (
            <g key={box.label}>
              <rect
                x={box.x}
                y={30}
                width={130}
                height={52}
                rx={10}
                fill={C.surface}
                stroke={box.color}
                strokeWidth={1.5}
              />
              <rect
                x={box.x}
                y={30}
                width={130}
                height={52}
                rx={10}
                fill={box.color}
                opacity={0.08}
              />
              <text
                x={box.x + 65}
                y={52}
                textAnchor="middle"
                fill={C.text}
                fontSize={11}
                fontWeight={600}
                fontFamily="'JetBrains Mono',monospace"
              >
                {box.label}
              </text>
              <text
                x={box.x + 65}
                y={70}
                textAnchor="middle"
                fill={C.textDim}
                fontSize={9}
                fontFamily="'JetBrains Mono',monospace"
              >
                {box.sub}
              </text>
              {i < 3 && (
                <g>
                  <line
                    x1={box.x + 130}
                    y1={56}
                    x2={box.x + 160}
                    y2={56}
                    stroke={C.textDim}
                    strokeWidth={1.2}
                    opacity={0.5}
                  />
                  <polygon
                    points={`${box.x + 160},${56} ${box.x + 154},${52} ${box.x + 154},${60}`}
                    fill={C.textDim}
                    opacity={0.6}
                  />
                </g>
              )}
            </g>
          ))}

          <text
            x={350}
            y={108}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
            opacity={0.6}
          >
            All routes: try-catch + NextResponse.json(&#123; data, error &#125;)
          </text>
        </svg>
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, textAlign: 'center', marginTop: 12, opacity: 0.5 }}
      >
        ※ グループをクリックしてエンドポイント一覧を確認 | 63 endpoints / 7 groups
      </p>
    </div>
  );
}
