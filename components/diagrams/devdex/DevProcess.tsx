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
  blueGlow: 'rgba(56,189,248,0.15)',
  green: '#3ecf8e',
  greenGlow: 'rgba(62,207,142,0.15)',
  amber: '#fbbf24',
  amberGlow: 'rgba(251,191,36,0.15)',
  purple: '#a78bfa',
  purpleGlow: 'rgba(167,139,250,0.15)',
  pink: '#f472b6',
  pinkGlow: 'rgba(244,114,182,0.15)',
  cyan: '#22d3ee',
  cyanGlow: 'rgba(34,211,238,0.15)',
  red: '#f87171',
  redGlow: 'rgba(248,113,113,0.15)',
};

/* ------------------------------------------------------------------ */
/*  Shared SVG primitives (same as Architecture.tsx)                   */
/* ------------------------------------------------------------------ */

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
      style={{ cursor: onClick ? 'pointer' : 'default' }}
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
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  label?: string;
  dashed?: boolean;
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

/* ------------------------------------------------------------------ */
/*  Detail panel                                                       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Section: Git Branch Flow                                           */
/* ------------------------------------------------------------------ */

function GitBranchFlow() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto 32px' }}>
      <div
        style={{
          color: C.text,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 16,
          fontFamily: "'JetBrains Mono',monospace",
        }}
      >
        <span style={{ color: C.green }}>&#9731;</span> Git Branch Strategy
      </div>
      <svg viewBox="0 0 700 260" width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <pattern id="process-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={C.border}
              strokeWidth="0.3"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="700" height="260" fill="url(#process-grid)" opacity="0.5" />

        {/* Branch lines */}
        <line x1={80} y1={50} x2={650} y2={50} stroke={C.green} strokeWidth={2.5} opacity={0.6} />
        <line x1={80} y1={110} x2={650} y2={110} stroke={C.blue} strokeWidth={2.5} opacity={0.6} />
        <line
          x1={200}
          y1={170}
          x2={500}
          y2={170}
          stroke={C.purple}
          strokeWidth={2.5}
          opacity={0.6}
        />

        {/* Branch labels */}
        <text
          x={30}
          y={54}
          fill={C.green}
          fontSize={11}
          fontWeight={700}
          fontFamily="'JetBrains Mono',monospace"
        >
          main
        </text>
        <text
          x={14}
          y={114}
          fill={C.blue}
          fontSize={11}
          fontWeight={700}
          fontFamily="'JetBrains Mono',monospace"
        >
          develop
        </text>
        <text
          x={110}
          y={174}
          fill={C.purple}
          fontSize={11}
          fontWeight={700}
          fontFamily="'JetBrains Mono',monospace"
        >
          feat/xxx
        </text>

        {/* Commit dots on main */}
        {[200, 400, 600].map((cx) => (
          <circle key={`m-${cx}`} cx={cx} cy={50} r={5} fill={C.green} />
        ))}
        <text
          x={200}
          y={32}
          textAnchor="middle"
          fill={C.textDim}
          fontSize={9}
          fontFamily="'JetBrains Mono',monospace"
        >
          v1.0.0
        </text>
        <text
          x={400}
          y={32}
          textAnchor="middle"
          fill={C.textDim}
          fontSize={9}
          fontFamily="'JetBrains Mono',monospace"
        >
          v1.1.0
        </text>
        <text
          x={600}
          y={32}
          textAnchor="middle"
          fill={C.textDim}
          fontSize={9}
          fontFamily="'JetBrains Mono',monospace"
        >
          v1.2.0
        </text>

        {/* Commit dots on develop */}
        {[150, 250, 300, 350, 450, 500, 550].map((cx) => (
          <circle key={`d-${cx}`} cx={cx} cy={110} r={4} fill={C.blue} />
        ))}

        {/* Commit dots on feat */}
        {[250, 320, 400].map((cx) => (
          <circle key={`f-${cx}`} cx={cx} cy={170} r={3.5} fill={C.purple} />
        ))}

        {/* Merge arrows: feat -> develop */}
        <path
          d="M 200 110 C 200 140, 200 140, 200 170"
          fill="none"
          stroke={C.purple}
          strokeWidth={1.2}
          strokeDasharray="4,3"
          opacity={0.5}
        />
        <path
          d="M 500 170 C 500 140, 500 140, 500 110"
          fill="none"
          stroke={C.purple}
          strokeWidth={1.2}
          opacity={0.5}
        />
        <polygon points="500,112 497,118 503,118" fill={C.purple} opacity={0.6} />

        {/* Merge arrows: develop -> main */}
        <path
          d="M 400 110 C 400 80, 400 80, 400 50"
          fill="none"
          stroke={C.blue}
          strokeWidth={1.2}
          opacity={0.5}
        />
        <polygon points="400,52 397,58 403,58" fill={C.blue} opacity={0.6} />

        <path
          d="M 600 110 C 600 80, 600 80, 600 50"
          fill="none"
          stroke={C.blue}
          strokeWidth={1.2}
          opacity={0.5}
        />
        <polygon points="600,52 597,58 603,58" fill={C.blue} opacity={0.6} />

        {/* Labels */}
        <text
          x={500}
          y={155}
          textAnchor="middle"
          fill={C.purple}
          fontSize={9}
          fontFamily="'JetBrains Mono',monospace"
          opacity={0.7}
        >
          PR merge
        </text>
        <text
          x={400}
          y={85}
          textAnchor="middle"
          fill={C.blue}
          fontSize={9}
          fontFamily="'JetBrains Mono',monospace"
          opacity={0.7}
        >
          release merge
        </text>

        {/* CI/CD Gate box */}
        <GroupBox
          x={100}
          y={200}
          width={500}
          height={50}
          label="CI/CD GATE: format > lint > test (2,422) > build"
          color={C.amber}
          icon="&#9888;"
        />
      </svg>

      {/* Rules */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          marginTop: 16,
        }}
      >
        {[
          {
            label: '1 issue = 1 branch = 1 PR',
            desc: '627 PRで徹底',
            color: C.blue,
          },
          {
            label: 'direct push to main',
            desc: '0 件（全てPR経由）',
            color: C.green,
          },
          {
            label: 'CI/CD 4段階ゲート',
            desc: 'format > lint > test > build',
            color: C.amber,
          },
        ].map((rule) => (
          <div
            key={rule.label}
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              background: C.surface,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                color: rule.color,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 4,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {rule.label}
            </div>
            <div
              style={{
                color: C.textMuted,
                fontSize: 10,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {rule.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Development Metrics                                       */
/* ------------------------------------------------------------------ */

function DevMetrics() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto 32px' }}>
      <div
        style={{
          color: C.text,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 16,
          fontFamily: "'JetBrains Mono',monospace",
        }}
      >
        <span style={{ color: C.cyan }}>&#128202;</span> Development Metrics
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          {
            value: '627+',
            label: 'PRs',
            sub: 'feat 174 / fix 41 / security 4',
            color: C.blue,
          },
          {
            value: '570+',
            label: 'Commits',
            sub: 'conventional commits',
            color: C.green,
          },
          {
            value: '6',
            label: 'Releases',
            sub: 'v1.0.0 ~ v1.2.0',
            color: C.amber,
          },
          {
            value: '28',
            label: 'Decision Docs',
            sub: 'docs/decisions/',
            color: C.purple,
          },
          {
            value: '11',
            label: 'Review Records',
            sub: 'docs/review/',
            color: C.pink,
          },
          {
            value: '0',
            label: 'Open Issues',
            sub: 'all resolved',
            color: C.green,
          },
          {
            value: '2,422',
            label: 'Tests',
            sub: '171 test files',
            color: C.cyan,
          },
          {
            value: '78h / 7d',
            label: 'Dev Time',
            sub: 'Claude Code driven',
            color: C.amber,
          },
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
            <div
              style={{
                color: m.color,
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                color: C.textDim,
                fontSize: 9,
                marginTop: 4,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                color: C.textDim,
                fontSize: 8,
                marginTop: 2,
                opacity: 0.6,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {m.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: SubAgents Pipeline                                        */
/* ------------------------------------------------------------------ */

interface AgentDef {
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

const agents: AgentDef[] = [
  {
    id: 'user',
    x: 20,
    y: 50,
    w: 80,
    h: 52,
    icon: '&#128100;',
    label: 'User',
    sublabel: '要件入力',
    color: C.text,
    glow: 'rgba(226,232,240,0.1)',
    detail:
      '開発者（自分）がSlash Commandやプロンプトで要件を入力。自然言語で機能の概要・目的を伝えるだけでパイプラインが起動する。',
  },
  {
    id: 'pm',
    x: 130,
    y: 50,
    w: 100,
    h: 52,
    icon: '&#128203;',
    label: 'PM',
    sublabel: '要件整理',
    color: C.amber,
    glow: C.amberGlow,
    detail:
      'PM Agent: 要件をIssue単位（1~2h）に分割。docs/decisions/ に意思決定記録を作成。ブランチ名・タスク粒度を決定してImplement Agentに引き渡す。',
  },
  {
    id: 'implement',
    x: 260,
    y: 50,
    w: 100,
    h: 52,
    icon: '&#128187;',
    label: 'Implement',
    sublabel: '実装',
    color: C.blue,
    glow: C.blueGlow,
    detail:
      'Implement Agent: docs/decisions/ の指示書に従ってコードを実装。CLAUDE.md の設計を参照し、TypeScript strict mode・Prettier・ESLint準拠でコードを生成。',
  },
  {
    id: 'test',
    x: 390,
    y: 50,
    w: 100,
    h: 52,
    icon: '&#129514;',
    label: 'Test',
    sublabel: 'TDD',
    color: C.green,
    glow: C.greenGlow,
    detail:
      'Test Agent: TDD方式でテストを作成。Vitest 4 + @testing-library/react で2,422テストを維持。失敗テスト → 最小実装 → リファクタの順で品質を担保。',
  },
  {
    id: 'review',
    x: 520,
    y: 50,
    w: 100,
    h: 52,
    icon: '&#128270;',
    label: 'Review',
    sublabel: '品質検査',
    color: C.pink,
    glow: C.pinkGlow,
    detail:
      'Review Agent: 品質・設計・セキュリティレビュー。docs/review/ にレビュー記録を残す。RLSポリシー・型安全・パフォーマンスの観点でコードを検証。',
  },
  {
    id: 'merge',
    x: 390,
    y: 150,
    w: 100,
    h: 52,
    icon: '&#9989;',
    label: 'PR Merge',
    sublabel: 'develop',
    color: C.green,
    glow: C.greenGlow,
    detail:
      'CI/CDゲート（format → lint → test → build）を通過後、PRをdevelopブランチにマージ。1 issue = 1 PR の原則を627本で徹底。',
  },
  {
    id: 'diary',
    x: 520,
    y: 150,
    w: 100,
    h: 52,
    icon: '&#128214;',
    label: 'Diary',
    sublabel: 'ログ記録',
    color: C.cyan,
    glow: C.cyanGlow,
    detail:
      'Diary Agent: PRマージ後にdocs/diary/に開発日記を自動追記。変更内容・設計判断・テスト結果をミニエントリとして記録。Zenn記事の素材にもなる。',
  },
];

function SubAgentsPipeline({
  activeNode,
  onNodeClick,
}: {
  activeNode: ActiveNode | null;
  onNodeClick: (agent: AgentDef) => void;
}) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div
        style={{
          color: C.text,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 16,
          fontFamily: "'JetBrains Mono',monospace",
        }}
      >
        <span style={{ color: C.purple }}>&#129302;</span> SubAgents Pipeline
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <svg viewBox="0 0 700 230" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="agent-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="700" height="230" fill="url(#agent-grid)" opacity="0.5" />

          {/* Group boxes */}
          <GroupBox
            x={10}
            y={22}
            width={630}
            height={98}
            label="AGENT PIPELINE"
            color={C.purple}
            icon="&#129302;"
          />
          <GroupBox
            x={370}
            y={125}
            width={270}
            height={95}
            label="OUTPUT"
            color={C.green}
            icon="&#128230;"
          />

          {/* Arrows between top-row agents */}
          <Arrow x1={100} y1={76} x2={130} y2={76} color={C.textDim} />
          <Arrow x1={230} y1={76} x2={260} y2={76} color={C.amber} label="decision" />
          <Arrow x1={360} y1={76} x2={390} y2={76} color={C.blue} label="code" />
          <Arrow x1={490} y1={76} x2={520} y2={76} color={C.green} label="tests" />

          {/* Arrow: Review -> PR Merge */}
          <Arrow x1={570} y1={102} x2={460} y2={150} color={C.pink} label="approved" />

          {/* Arrow: PR Merge -> Diary */}
          <Arrow x1={490} y1={176} x2={520} y2={176} color={C.green} label="merged" />

          {/* Agent nodes */}
          {agents.map((a) => (
            <NodeBox
              key={a.id}
              x={a.x}
              y={a.y}
              width={a.w}
              height={a.h}
              icon={a.icon}
              label={a.label}
              sublabel={a.sublabel}
              color={a.color}
              glowColor={a.glow}
              isActive={activeNode?.id === a.id}
              onClick={() => onNodeClick(a)}
            />
          ))}
        </svg>

        <DetailPanel node={activeNode} onClose={() => onNodeClick(agents[0])} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function DevProcess() {
  const [activeNode, setActiveNode] = useState<ActiveNode | null>(null);

  const handleAgentClick = (a: AgentDef) => {
    setActiveNode(
      activeNode?.id === a.id
        ? null
        : {
            id: a.id,
            icon: a.icon,
            label: a.label,
            color: a.color,
            glowColor: a.glow,
            detail: a.detail,
          },
    );
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono','Fira Code',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2
          style={{
            color: C.text,
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: C.amber }}>&#9881;</span> DevDex
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
          Development Process
        </p>
      </div>

      {/* Tags */}
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
          'Git Flow',
          'CI/CD',
          'SubAgents',
          '627+ PRs',
          '2,422 Tests',
          '0 Direct Push',
          'Claude Code',
        ].map((t) => (
          <span
            key={t}
            style={{
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.2)',
              color: C.blue,
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Section 1: Git Branch Flow */}
      <GitBranchFlow />

      {/* Section 2: Development Metrics */}
      <DevMetrics />

      {/* Section 3: SubAgents Pipeline */}
      <SubAgentsPipeline activeNode={activeNode} onNodeClick={handleAgentClick} />

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 24,
          padding: '12px 20px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${C.border}`,
        }}
      >
        {[
          { color: C.green, label: 'main' },
          { color: C.blue, label: 'develop' },
          { color: C.purple, label: 'feature' },
          { color: C.amber, label: 'CI/CD' },
          { color: C.pink, label: 'Review' },
          { color: C.cyan, label: 'Diary' },
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
        ※ SubAgents の各ノードをクリックすると詳細が表示されます
      </p>
    </div>
  );
}
