'use client';

import { useState, useCallback } from 'react';

const C: Record<string, string> = {
  bg: '#0a0e1a',
  surface: '#111827',
  surfaceHover: '#1a2332',
  border: '#1e293b',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  blue: '#38bdf8',
  blueGlow: 'rgba(56,189,248,0.15)',
  green: '#3ecf8e',
  greenGlow: 'rgba(62,207,142,0.12)',
  amber: '#fbbf24',
  amberGlow: 'rgba(251,191,36,0.12)',
  purple: '#a78bfa',
  purpleGlow: 'rgba(167,139,250,0.12)',
  pink: '#f472b6',
  pinkGlow: 'rgba(244,114,182,0.12)',
  cyan: '#22d3ee',
  cyanGlow: 'rgba(34,211,238,0.12)',
  red: '#f87171',
  redGlow: 'rgba(248,113,113,0.12)',
};

interface Field {
  n: string;
  t: string;
  pk?: boolean;
  fk?: boolean;
}

interface Table {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  color: string;
  glow: string;
  fields: Field[];
}

interface Relation {
  from: string;
  to: string;
  label: string;
  type: string;
  dashed?: boolean;
}

const tables: Table[] = [
  {
    id: 'profiles',
    label: 'profiles',
    icon: '&#128100;',
    x: 340,
    y: 30,
    w: 230,
    color: C.blue,
    glow: C.blueGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'role', t: 'user_role ENUM' },
      { n: 'display_name', t: 'text' },
      { n: 'username', t: 'text (unique)' },
      { n: 'level / xp', t: 'int' },
      { n: 'engineer_type', t: 'text?' },
    ],
  },
  {
    id: 'terms',
    label: 'terms',
    icon: '&#128214;',
    x: 40,
    y: 30,
    w: 220,
    color: C.green,
    glow: C.greenGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'user_id', t: 'UUID (FK)', fk: true },
      { n: 'name / category', t: 'text' },
      { n: 'mastery_score', t: '1-5' },
      { n: 'overview', t: 'text (AI)' },
      { n: 'my_experience', t: 'text' },
      { n: 'parent_id', t: 'UUID? (self FK)', fk: true },
    ],
  },
  {
    id: 'term_relations',
    label: 'term_relations',
    icon: '&#128279;',
    x: 40,
    y: 280,
    w: 200,
    color: C.green,
    glow: C.greenGlow,
    fields: [
      { n: 'term_id', t: 'UUID (PK, FK)', pk: true, fk: true },
      { n: 'related_term_id', t: 'UUID (PK, FK)', pk: true, fk: true },
    ],
  },
  {
    id: 'diagnosis',
    label: 'diagnosis_results',
    icon: '&#128300;',
    x: 40,
    y: 410,
    w: 220,
    color: C.purple,
    glow: C.purpleGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'user_id', t: 'UUID? (FK)', fk: true },
      { n: 'engineer_type', t: 'text' },
      { n: 'scores (4 axes)', t: 'int' },
      { n: 'session_id', t: 'UUID' },
    ],
  },
  {
    id: 'interpersonal',
    label: 'interpersonal_results',
    icon: '&#129309;',
    x: 40,
    y: 570,
    w: 220,
    color: C.purple,
    glow: C.purpleGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'user_id', t: 'UUID? (FK)', fk: true },
      { n: 'interpersonal_type', t: 'text' },
      { n: 'scores (4 types)', t: 'int' },
    ],
  },
  {
    id: 'skillsheet',
    label: 'skillsheet_projects',
    icon: '&#128196;',
    x: 340,
    y: 280,
    w: 230,
    color: C.cyan,
    glow: C.cyanGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'user_id', t: 'UUID (FK)', fk: true },
      { n: 'project_name', t: 'text' },
      { n: 'role / period', t: 'text' },
      { n: 'technologies', t: 'text[]' },
      { n: 'responsibilities', t: 'text[]' },
    ],
  },
  {
    id: 'survey',
    label: 'survey_responses',
    icon: '&#128203;',
    x: 340,
    y: 460,
    w: 230,
    color: C.amber,
    glow: C.amberGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'user_id', t: 'UUID (FK)', fk: true },
      { n: 'answers', t: 'jsonb' },
      { n: 'survey_type', t: 'text' },
    ],
  },
  {
    id: 'orgs',
    label: 'organizations',
    icon: '&#127970;',
    x: 650,
    y: 30,
    w: 220,
    color: C.amber,
    glow: C.amberGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'name / plan', t: 'text' },
      { n: 'status', t: 'ENUM' },
    ],
  },
  {
    id: 'org_members',
    label: 'organization_members',
    icon: '&#128101;',
    x: 650,
    y: 180,
    w: 220,
    color: C.amber,
    glow: C.amberGlow,
    fields: [
      { n: 'org_id', t: 'UUID (FK)', fk: true },
      { n: 'user_id', t: 'UUID (FK)', fk: true },
      { n: 'role', t: 'org_role ENUM' },
    ],
  },
  {
    id: 'org_bookmarks',
    label: 'organization_bookmarks',
    icon: '&#128278;',
    x: 650,
    y: 330,
    w: 220,
    color: C.amber,
    glow: C.amberGlow,
    fields: [
      { n: 'org_id', t: 'UUID (FK)', fk: true },
      { n: 'bookmarked_user_id', t: 'UUID (FK)', fk: true },
    ],
  },
  {
    id: 'notifications',
    label: 'notifications',
    icon: '&#128276;',
    x: 650,
    y: 460,
    w: 220,
    color: C.pink,
    glow: C.pinkGlow,
    fields: [
      { n: 'id', t: 'UUID (PK)', pk: true },
      { n: 'user_id', t: 'UUID (FK)', fk: true },
      { n: 'type / title', t: 'text' },
      { n: 'is_read', t: 'boolean' },
    ],
  },
  {
    id: 'stripe_customers',
    label: 'stripe_customers',
    icon: '&#128179;',
    x: 650,
    y: 600,
    w: 220,
    color: C.pink,
    glow: C.pinkGlow,
    fields: [
      { n: 'user_id', t: 'UUID (FK, PK)', pk: true, fk: true },
      { n: 'stripe_customer_id', t: 'text' },
      { n: 'subscription_status', t: 'text' },
    ],
  },
];

const relations: Relation[] = [
  { from: 'terms', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'term_relations', to: 'terms', label: 'term_id', type: 'N:N' },
  { from: 'diagnosis', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'interpersonal', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'skillsheet', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'survey', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'org_members', to: 'orgs', label: 'org_id', type: 'N:1' },
  { from: 'org_members', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'org_bookmarks', to: 'orgs', label: 'org_id', type: 'N:1' },
  { from: 'org_bookmarks', to: 'profiles', label: 'user_id', type: 'N:1', dashed: true },
  { from: 'notifications', to: 'profiles', label: 'user_id', type: 'N:1' },
  { from: 'stripe_customers', to: 'profiles', label: 'user_id', type: '1:1' },
];

function TableBox({
  table,
  isActive,
  onClick,
}: {
  table: Table;
  isActive: boolean;
  onClick: (t: Table) => void;
}) {
  const [hov, setHov] = useState(false);
  const show = hov || isActive;
  const headerH = 32;
  const fieldH = 18;
  const totalH = headerH + table.fields.length * fieldH + 8;

  return (
    <g
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(table)}
      style={{ cursor: 'pointer' }}
    >
      {show && (
        <rect
          x={table.x - 3}
          y={table.y - 3}
          width={table.w + 6}
          height={totalH + 6}
          rx={12}
          fill="none"
          stroke={table.color}
          strokeWidth={1.5}
          opacity={0.4}
        />
      )}
      <rect
        x={table.x}
        y={table.y}
        width={table.w}
        height={totalH}
        rx={10}
        fill={show ? C.surfaceHover : C.surface}
        stroke={show ? table.color : C.border}
        strokeWidth={show ? 1.5 : 1}
      />
      <rect
        x={table.x}
        y={table.y}
        width={table.w}
        height={headerH}
        rx={10}
        fill={table.color}
        opacity={0.15}
      />
      <rect
        x={table.x}
        y={table.y + headerH - 6}
        width={table.w}
        height={6}
        fill={table.color}
        opacity={0.15}
      />
      <text
        x={table.x + 10}
        y={table.y + 21}
        fill={table.color}
        fontSize={12}
        fontWeight={700}
        fontFamily="'JetBrains Mono',monospace"
      >
        {table.icon} {table.label}
      </text>
      {table.fields.map((f, i) => (
        <g key={f.n}>
          <text
            x={table.x + 10}
            y={table.y + headerH + 14 + i * fieldH}
            fill={f.pk ? C.amber : f.fk ? C.cyan : C.text}
            fontSize={9.5}
            fontFamily="'JetBrains Mono',monospace"
          >
            {f.pk ? '&#9670; ' : f.fk ? '&#9674; ' : '  '}
            {f.n}
          </text>
          <text
            x={table.x + table.w - 8}
            y={table.y + headerH + 14 + i * fieldH}
            textAnchor="end"
            fill={C.textDim}
            fontSize={8}
            fontFamily="'JetBrains Mono',monospace"
          >
            {f.t}
          </text>
        </g>
      ))}
    </g>
  );
}

function RelLine({ rel, tblMap }: { rel: Relation; tblMap: Record<string, Table> }) {
  const from = tblMap[rel.from];
  const to = tblMap[rel.to];
  if (!from || !to) return null;

  const fx = from.x + from.w;
  const fy = from.y + 16;
  const tx = to.x;
  const ty = to.y + 16;

  // If 'to' is to the left, use different anchors
  const fromRight = fx <= tx;
  const sx = fromRight ? fx : from.x;
  const ex = fromRight ? tx : to.x + to.w;

  const midX = (sx + ex) / 2;

  return (
    <g>
      <path
        d={`M ${sx} ${fy} C ${midX} ${fy}, ${midX} ${ty}, ${ex} ${ty}`}
        fill="none"
        stroke={C.textDim}
        strokeWidth={1}
        strokeDasharray={rel.dashed ? '4,3' : 'none'}
        opacity={0.35}
      />
      <circle cx={ex} cy={ty} r={3} fill={to.color} opacity={0.6} />
      <rect
        x={midX - rel.type.length * 3 - 4}
        y={(fy + ty) / 2 - 8}
        width={rel.type.length * 6 + 8}
        height={14}
        rx={3}
        fill={C.bg}
        opacity={0.9}
      />
      <text
        x={midX}
        y={(fy + ty) / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={C.textDim}
        fontSize={8}
        fontFamily="'JetBrains Mono',monospace"
      >
        {rel.type}
      </text>
    </g>
  );
}

export default function DevDexERDiagram() {
  const [active, setActive] = useState<Table | null>(null);
  const tblMap: Record<string, Table> = {};
  tables.forEach((t) => (tblMap[t.id] = t));

  const handleClick = useCallback((t: Table) => {
    setActive((prev) => (prev?.id === t.id ? null : t));
  }, []);

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.green }}>&#128451;</span> DevDex - ER Diagram
        </h2>
        <p style={{ color: C.textDim, fontSize: 11, margin: '6px 0 0', letterSpacing: '0.1em' }}>
          SUPABASE POSTGRESQL - RELATIONAL SCHEMA WITH RLS
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 16,
          maxWidth: 700,
          margin: '0 auto 16px',
        }}
      >
        {[
          { label: 'RLS', desc: '全テーブルにポリシー適用' },
          { label: '34 migrations', desc: 'スキーマ管理' },
          { label: 'ENUM', desc: 'user_role / org_role' },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(62,207,142,0.06)',
              border: '1px solid rgba(62,207,142,0.15)',
            }}
          >
            <span style={{ color: C.green, fontSize: 10, fontWeight: 600 }}>{p.label}</span>
            <span style={{ color: C.textDim, fontSize: 9, marginLeft: 6 }}>{p.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 920, margin: '0 auto', position: 'relative' }}>
        <svg viewBox="0 0 920 760" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="devdex-ergrid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path
                d="M 16 0 L 0 0 0 16"
                fill="none"
                stroke={C.border}
                strokeWidth="0.2"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="920" height="760" fill="url(#devdex-ergrid)" opacity="0.4" />

          <text
            x={150}
            y={20}
            textAnchor="middle"
            fill={C.green}
            fontSize={10}
            fontWeight={600}
            opacity={0.5}
            fontFamily="'JetBrains Mono',monospace"
          >
            CORE DATA
          </text>
          <text
            x={760}
            y={20}
            textAnchor="middle"
            fill={C.amber}
            fontSize={10}
            fontWeight={600}
            opacity={0.5}
            fontFamily="'JetBrains Mono',monospace"
          >
            ORGANIZATION
          </text>
          <text
            x={760}
            y={450}
            textAnchor="middle"
            fill={C.pink}
            fontSize={10}
            fontWeight={600}
            opacity={0.5}
            fontFamily="'JetBrains Mono',monospace"
          >
            SYSTEM
          </text>

          {relations.map((r, i) => (
            <RelLine key={i} rel={r} tblMap={tblMap} />
          ))}
          {tables.map((t) => (
            <TableBox key={t.id} table={t} isActive={active?.id === t.id} onClick={handleClick} />
          ))}
        </svg>

        {active && (
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              background: C.surface,
              border: `1px solid ${active.color}`,
              borderRadius: 12,
              padding: '14px 18px',
              maxWidth: 500,
              width: '90%',
              boxShadow: `0 0 24px ${active.glow}`,
              zIndex: 10,
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
              <span style={{ color: active.color, fontWeight: 700, fontSize: 13 }}>
                {active.icon} {active.label}
              </span>
              <span
                onClick={() => setActive(null)}
                style={{ color: C.textDim, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
              >
                x
              </span>
            </div>
            <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.7 }}>
              <span style={{ color: C.text, fontWeight: 600 }}>Columns: </span>
              {active.fields.map((f) => f.n).join(', ')}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 16,
        }}
      >
        {[
          { c: C.blue, l: 'Profiles (Auth)' },
          { c: C.green, l: 'Terms (Core)' },
          { c: C.purple, l: 'Diagnosis' },
          { c: C.cyan, l: 'Skillsheet' },
          { c: C.amber, l: 'Organization' },
          { c: C.pink, l: 'System' },
        ].map((x) => (
          <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: x.c, opacity: 0.8 }} />
            <span style={{ color: C.textDim, fontSize: 9 }}>{x.l}</span>
          </div>
        ))}
      </div>
      <p style={{ color: C.textDim, fontSize: 9, textAlign: 'center', marginTop: 8, opacity: 0.5 }}>
        ※ 各テーブルをクリックすると詳細が表示されます | 12 tables / 34 migrations / RLS on all
        tables
      </p>
    </div>
  );
}
