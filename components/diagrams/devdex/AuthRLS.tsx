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
  red: '#f87171',
};

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: { label: string; detail: string }[];
}

const sections: Section[] = [
  {
    id: 'auth-flow',
    title: 'Authentication Flow',
    icon: '&#128274;',
    color: C.blue,
    items: [
      { label: 'Supabase Auth', detail: 'Email/Password + OAuth (GitHub, Google)' },
      { label: 'JWT Token', detail: 'Supabase Auth が JWT を発行。サーバー側で検証' },
      { label: 'Middleware', detail: 'Next.js Middleware でセッション検証 + リダイレクト制御' },
      {
        label: 'Server Component',
        detail: 'createServerClient() でサーバー側からユーザー情報を取得',
      },
      { label: 'Client Component', detail: 'createBrowserClient() でクライアント側認証状態を管理' },
    ],
  },
  {
    id: 'rls',
    title: 'Row Level Security (RLS)',
    icon: '&#128737;',
    color: C.green,
    items: [
      { label: 'profiles', detail: 'SELECT = 全員 / UPDATE = 本人のみ (id = auth.uid())' },
      { label: 'terms', detail: 'CRUD = 本人のみ (user_id = auth.uid())' },
      { label: 'diagnosis_results', detail: 'SELECT/INSERT = 本人のみ' },
      { label: 'skillsheet_projects', detail: 'CRUD = 本人のみ (user_id = auth.uid())' },
      { label: 'organizations', detail: 'メンバーシップベースのアクセス制御' },
      { label: 'notifications', detail: 'SELECT/UPDATE = 本人のみ' },
      {
        label: 'stripe_customers',
        detail: 'SELECT = 本人のみ / INSERT/UPDATE = service_role のみ',
      },
    ],
  },
  {
    id: 'roles',
    title: 'Role System',
    icon: '&#128081;',
    color: C.amber,
    items: [
      { label: 'user (Free)', detail: '基本機能全て無料。AI補完 10回/日、抽出 月2回' },
      {
        label: 'pro (課金)',
        detail: '公開URL、PDF/Excel出力、AI補完 50回/日、抽出無制限、面談シミュレーター',
      },
      { label: 'admin', detail: '全機能 + 全組織アクセス + ユーザー管理' },
    ],
  },
  {
    id: 'org-roles',
    title: 'Organization Roles',
    icon: '&#127970;',
    color: C.purple,
    items: [
      { label: 'owner', detail: '組織設定・削除・メンバー管理・プラン変更' },
      { label: 'admin', detail: 'メンバー追加・削除・候補者検索' },
      { label: 'member', detail: '検索・ブックマーク・ログ閲覧' },
      { label: 'viewer', detail: '閲覧専用。ブックマーク不可' },
    ],
  },
  {
    id: 'feature-gate',
    title: 'Feature Gate Pattern',
    icon: '&#128682;',
    color: C.pink,
    items: [
      { label: 'checkFeatureAccess()', detail: 'ロールに基づいて機能アクセスを制御するヘルパー' },
      {
        label: 'AI利用上限',
        detail: 'ai_daily_usage テーブルで日別利用回数を管理。Free/Pro で上限を差別化',
      },
      {
        label: 'Stripe Webhook',
        detail: 'checkout.session.completed → profiles.role を pro に更新',
      },
      {
        label: 'subscription_deleted',
        detail: 'Webhook で Pro → Free にダウングレード。データは保持',
      },
    ],
  },
];

export default function DevDexAuthRLS() {
  const [activeSection, setActiveSection] = useState<string>('auth-flow');

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.blue }}>&#128274;</span> DevDex - Auth & RLS
        </h2>
        <p style={{ color: C.textDim, fontSize: 11, margin: '6px 0 0', letterSpacing: '0.1em' }}>
          SUPABASE AUTH + ROW LEVEL SECURITY + ROLE-BASED ACCESS CONTROL
        </p>
      </div>

      {/* Auth flow diagram */}
      <div style={{ maxWidth: 700, margin: '0 auto 32px', position: 'relative' }}>
        <svg viewBox="0 0 700 160" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="auth-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="700" height="160" fill="url(#auth-grid)" opacity="0.5" />

          {/* Flow boxes */}
          {[
            { x: 20, label: 'Browser', sub: 'Login Form', color: C.blue },
            { x: 160, label: 'Supabase Auth', sub: 'JWT Issue', color: C.green },
            { x: 320, label: 'Middleware', sub: 'Session Check', color: C.amber },
            { x: 480, label: 'Server Comp.', sub: 'getUser()', color: C.purple },
          ].map((box, i) => (
            <g key={box.label}>
              <rect
                x={box.x}
                y={50}
                width={120}
                height={52}
                rx={10}
                fill={C.surface}
                stroke={box.color}
                strokeWidth={1.5}
              />
              <rect
                x={box.x}
                y={50}
                width={120}
                height={52}
                rx={10}
                fill={box.color}
                opacity={0.08}
              />
              <text
                x={box.x + 60}
                y={72}
                textAnchor="middle"
                fill={C.text}
                fontSize={11}
                fontWeight={600}
                fontFamily="'JetBrains Mono',monospace"
              >
                {box.label}
              </text>
              <text
                x={box.x + 60}
                y={90}
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
                    x1={box.x + 120}
                    y1={76}
                    x2={box.x + 140}
                    y2={76}
                    stroke={C.textDim}
                    strokeWidth={1.2}
                    opacity={0.5}
                  />
                  <polygon
                    points={`${box.x + 140},${76} ${box.x + 134},${72} ${box.x + 134},${80}`}
                    fill={C.textDim}
                    opacity={0.6}
                  />
                </g>
              )}
            </g>
          ))}

          {/* RLS arrow from Server Comp */}
          <line
            x1={540}
            y1={102}
            x2={540}
            y2={140}
            stroke={C.green}
            strokeWidth={1.2}
            opacity={0.5}
          />
          <polygon points="540,140 536,134 544,134" fill={C.green} opacity={0.6} />
          <rect
            x={550}
            y={126}
            width={120}
            height={28}
            rx={6}
            fill={C.surface}
            stroke={C.green}
            strokeWidth={1}
          />
          <text
            x={610}
            y={144}
            textAnchor="middle"
            fill={C.green}
            fontSize={10}
            fontWeight={600}
            fontFamily="'JetBrains Mono',monospace"
          >
            RLS Enforced
          </text>
        </svg>
      </div>

      {/* Section tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 24,
          maxWidth: 700,
          margin: '0 auto 24px',
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: `1px solid ${activeSection === s.id ? s.color : C.border}`,
              background: activeSection === s.id ? `${s.color}10` : C.surface,
              color: activeSection === s.id ? s.color : C.textMuted,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono',monospace",
              transition: 'all 0.2s',
            }}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Active section content */}
      {sections
        .filter((s) => s.id === activeSection)
        .map((section) => (
          <div
            key={section.id}
            style={{
              maxWidth: 700,
              margin: '0 auto',
              background: C.surface,
              border: `1px solid ${section.color}`,
              borderRadius: 12,
              padding: '20px 24px',
              boxShadow: `0 0 20px rgba(0,0,0,0.3)`,
            }}
          >
            <h3
              style={{
                color: section.color,
                fontSize: 16,
                fontWeight: 700,
                margin: '0 0 16px',
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {section.icon} {section.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {section.items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div style={{ color: C.text, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.6 }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      <p
        style={{ color: C.textDim, fontSize: 10, textAlign: 'center', marginTop: 16, opacity: 0.5 }}
      >
        ※ 各タブをクリックして詳細を確認 | Supabase Auth + RLS + 3-tier role model
      </p>
    </div>
  );
}
