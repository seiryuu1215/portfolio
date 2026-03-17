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

interface Section {
  id: string;
  icon: string;
  title: string;
  color: string;
  content: React.ReactNode;
}

function Card({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: '14px 18px',
        borderRadius: 10,
        background: C.bg,
        border: `1px solid ${C.border}`,
        marginBottom: 10,
      }}
    >
      <div style={{ color, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
      <span style={{ color: C.blue, marginTop: 2, fontSize: 8 }}>&#9654;</span>
      <span style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

const sections: Section[] = [
  {
    id: 'persona',
    icon: '&#128100;',
    title: 'Target & Persona',
    color: C.blue,
    content: (
      <>
        <Card title="&#127919; Main Target" color={C.blue}>
          <Item text="25歳フリーランスエンジニア" />
          <Item text="キャッチアップに不安を感じている" />
          <Item text="面談前に「自分がどの技術をどこまで理解しているか」を整理したい" />
          <Item text="スキルシートは書けるが、内面的な理解度は可視化できていない" />
        </Card>
        <Card title="&#128101; Sub Target" color={C.purple}>
          <Item text="シニアエンジニア（豊富な知識を持つが一から入力が大変）" />
          <Item text="AI長文抽出で「職務経歴書を貼るだけ」で用語登録が完了" />
        </Card>
      </>
    ),
  },
  {
    id: 'concept',
    icon: '&#128161;',
    title: 'Concept',
    color: C.amber,
    content: (
      <>
        <Card title="&#128218; Core Concept" color={C.amber}>
          <div
            style={{
              color: C.text,
              fontSize: 16,
              fontWeight: 700,
              textAlign: 'center',
              padding: '12px 0',
              lineHeight: 1.6,
            }}
          >
            &ldquo;スキルシートが外面なら、
            <br />
            <span style={{ color: C.amber }}>DevDex は内面</span>&rdquo;
          </div>
          <Item text="IT用語の理解度を蓄積・育てていく図鑑" />
          <Item text="Dev (開発者) + Dex (図鑑, Index の略)" />
          <Item text="「集める・育てる」ポケデックス的なコンセプト" />
        </Card>
        <Card title="&#127918; Game Elements" color={C.green}>
          <Item text="習熟度スコアの累積でレベルアップ + キャラクター成長" />
          <Item text="カテゴリ別レーダーチャートでスキルバランスを可視化" />
          <Item text="エンジニアタイプ診断 (16タイプ) + 対人スタイル診断" />
          <Item text="Duolingo のストリークに近いイメージ" />
        </Card>
      </>
    ),
  },
  {
    id: 'revenue',
    icon: '&#128176;',
    title: 'Revenue Model',
    color: C.green,
    content: (
      <>
        <Card title="&#128100; toC (エンジニア向け)" color={C.green}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                background: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              <div style={{ color: C.text, fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
                Free
              </div>
              <Item text="用語CRUD・検索・ピン留め" />
              <Item text="エンジニア診断 (基本)" />
              <Item text="AI補完 10回/日" />
              <Item text="抽出 月2回" />
            </div>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                background: C.surface,
                border: `1px solid ${C.green}30`,
              }}
            >
              <div style={{ color: C.green, fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
                Pro (月500円)
              </div>
              <Item text="公開プロフィール URL" />
              <Item text="PDF/Excel 出力" />
              <Item text="AI補完 50回/日, 抽出無制限" />
              <Item text="面談シミュレーター" />
              <Item text="学習プラン・ギャップ分析" />
            </div>
          </div>
        </Card>
        <Card title="&#127970; toB (企業向け)" color={C.amber}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[
              { name: 'Org Free', items: ['候補者閲覧', 'ブックマーク', '検索 5件/月', '3名まで'] },
              { name: 'Org Pro', items: ['候補者検索 無制限', '候補者比較', '10名まで'] },
              { name: 'Enterprise', items: ['ATS Webhook', 'ATS連携設定', 'メンバー無制限'] },
            ].map((plan) => (
              <div
                key={plan.name}
                style={{
                  padding: '8px 10px',
                  borderRadius: 6,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div style={{ color: C.amber, fontSize: 10, fontWeight: 600, marginBottom: 4 }}>
                  {plan.name}
                </div>
                {plan.items.map((item) => (
                  <div key={item} style={{ color: C.textMuted, fontSize: 9, marginBottom: 2 }}>
                    &#9654; {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </>
    ),
  },
  {
    id: 'funnel',
    icon: '&#128200;',
    title: 'Acquisition Funnel',
    color: C.pink,
    content: (
      <>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <svg viewBox="0 0 600 220" width="100%" style={{ overflow: 'visible' }}>
            <defs>
              <pattern id="req-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke={C.border}
                  strokeWidth="0.3"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="600" height="220" fill="url(#req-grid)" opacity="0.5" />

            {/* Funnel steps */}
            {[
              { x: 20, w: 100, label: 'Diagnosis', sub: '登録不要', color: C.purple },
              { x: 140, w: 100, label: 'SNS Share', sub: 'OGP画像', color: C.pink },
              { x: 260, w: 100, label: 'Register', sub: 'Supabase Auth', color: C.green },
              { x: 380, w: 100, label: 'Data Build', sub: '用語蓄積', color: C.blue },
              { x: 500, w: 80, label: 'Pro', sub: '月500円', color: C.amber },
            ].map((step, i, arr) => (
              <g key={step.label}>
                <rect
                  x={step.x}
                  y={60}
                  width={step.w}
                  height={52}
                  rx={10}
                  fill={C.surface}
                  stroke={step.color}
                  strokeWidth={1.5}
                />
                <rect
                  x={step.x}
                  y={60}
                  width={step.w}
                  height={52}
                  rx={10}
                  fill={step.color}
                  opacity={0.08}
                />
                <text
                  x={step.x + step.w / 2}
                  y={82}
                  textAnchor="middle"
                  fill={C.text}
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="'JetBrains Mono',monospace"
                >
                  {step.label}
                </text>
                <text
                  x={step.x + step.w / 2}
                  y={100}
                  textAnchor="middle"
                  fill={C.textDim}
                  fontSize={9}
                  fontFamily="'JetBrains Mono',monospace"
                >
                  {step.sub}
                </text>
                {i < arr.length - 1 && (
                  <g>
                    <line
                      x1={step.x + step.w}
                      y1={86}
                      x2={arr[i + 1].x}
                      y2={86}
                      stroke={C.textDim}
                      strokeWidth={1.2}
                      opacity={0.4}
                    />
                    <polygon
                      points={`${arr[i + 1].x},${86} ${arr[i + 1].x - 6},${82} ${arr[i + 1].x - 6},${90}`}
                      fill={C.textDim}
                      opacity={0.5}
                    />
                  </g>
                )}
              </g>
            ))}

            {/* Annotations */}
            <text
              x={190}
              y={145}
              textAnchor="middle"
              fill={C.pink}
              fontSize={9}
              fontFamily="'JetBrains Mono',monospace"
              opacity={0.7}
            >
              viral loop
            </text>
            <path
              d="M 190 135 C 190 170, 70 170, 70 115"
              fill="none"
              stroke={C.pink}
              strokeWidth={1}
              strokeDasharray="4,3"
              opacity={0.4}
            />
            <polygon points="70,115 67,121 73,121" fill={C.pink} opacity={0.5} />

            <text
              x={300}
              y={180}
              textAnchor="middle"
              fill={C.textDim}
              fontSize={9}
              fontFamily="'JetBrains Mono',monospace"
              opacity={0.5}
            >
              Value increases over time &gt; conversion to Pro
            </text>
          </svg>
        </div>
      </>
    ),
  },
  {
    id: 'scale',
    icon: '&#128202;',
    title: 'Scale & Metrics',
    color: C.cyan,
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { value: '568+', label: 'PRs', color: C.blue },
          { value: '64', label: 'API Routes', color: C.green },
          { value: '33', label: 'Pages', color: C.purple },
          { value: '127', label: 'Components', color: C.amber },
          { value: '86,000+', label: 'Lines (TS)', color: C.cyan },
          { value: '2,111', label: 'Tests', color: C.green },
          { value: '35', label: 'Migrations', color: C.pink },
          { value: '461', label: 'TS Files', color: C.blue },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              textAlign: 'center',
              padding: '14px 8px',
              borderRadius: 10,
              background: C.surface,
              border: `1px solid ${C.border}`,
            }}
          >
            <div style={{ color: m.color, fontSize: 20, fontWeight: 700 }}>{m.value}</div>
            <div style={{ color: C.textDim, fontSize: 9, marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function DevDexRequirements() {
  const [activeSection, setActiveSection] = useState<string>('persona');

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.amber }}>&#128203;</span> DevDex - Requirements & Persona
        </h2>
        <p style={{ color: C.textDim, fontSize: 11, margin: '6px 0 0', letterSpacing: '0.1em' }}>
          PRODUCT VISION / TARGET / REVENUE MODEL / METRICS
        </p>
      </div>

      {/* Section tabs */}
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
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              padding: '5px 14px',
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

      {/* Active section */}
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {sections
          .filter((s) => s.id === activeSection)
          .map((section) => (
            <div key={section.id}>{section.content}</div>
          ))}
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, textAlign: 'center', marginTop: 16, opacity: 0.5 }}
      >
        ※ 各タブをクリックして詳細を確認
      </p>
    </div>
  );
}
