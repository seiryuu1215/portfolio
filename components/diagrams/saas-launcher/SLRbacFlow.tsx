'use client';

import { useState } from 'react';

const C = {
  bg: '#0a0e1a',
  surface: '#111827',
  surfaceHover: '#1a2332',
  border: '#1e293b',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  accent: '#38bdf8',
  accentGlow: 'rgba(56, 189, 248, 0.15)',
  green: '#34d399',
  greenGlow: 'rgba(52, 211, 153, 0.12)',
  yellow: '#fbbf24',
  yellowGlow: 'rgba(251, 191, 36, 0.12)',
  pink: '#f472b6',
  pinkGlow: 'rgba(244, 114, 182, 0.12)',
  external: '#a78bfa',
  externalGlow: 'rgba(167, 139, 250, 0.12)',
};

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
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {node.icon} {node.label}
        </span>
        <span
          onClick={onClose}
          style={{ color: C.textDim, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
        >
          ×
        </span>
      </div>
      <p
        style={{
          color: C.textMuted,
          fontSize: 12,
          lineHeight: 1.7,
          margin: 0,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {node.detail}
      </p>
    </div>
  );
}

interface PipelineNode {
  id: string;
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
  detail: string;
  y: number;
}

const pipelineNodes: PipelineNode[] = [
  {
    id: 'request',
    icon: '📨',
    label: 'リクエスト',
    sublabel: 'HTTP Request',
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'クライアントからの HTTP リクエスト。API Route に到達する前にミドルウェアチェーンを通過する。',
    y: 60,
  },
  {
    id: 'ratelimit',
    icon: '⏱️',
    label: 'Rate Limit',
    sublabel: '60 req/min (Upstash Redis)',
    color: C.yellow,
    glow: C.yellowGlow,
    detail:
      'Upstash Redis ベースのレートリミット。60 req/min を超えると 429 Too Many Requests を返却。Redis 障害時はインメモリフォールバック。',
    y: 160,
  },
  {
    id: 'jwt',
    icon: '🔐',
    label: 'JWT 認証チェック',
    sublabel: 'NextAuth getServerSession',
    color: C.green,
    glow: C.greenGlow,
    detail:
      'NextAuth の getServerSession で JWT セッションを検証。有効なセッションがない場合は 401 Unauthorized を返却。userId と role をコンテキストに注入。',
    y: 260,
  },
  {
    id: 'rbac',
    icon: '🛡️',
    label: 'RBAC',
    sublabel: 'admin / pro / general',
    color: C.external,
    glow: C.externalGlow,
    detail:
      'ロールベースアクセス制御。admin: 管理機能 + 全機能、pro: 全機能アクセス、general: 基本機能のみ。withAdmin / withPermission で宣言的に保護。',
    y: 360,
  },
  {
    id: 'handler',
    icon: '⚙️',
    label: 'ハンドラ実行',
    sublabel: 'API Route Handler',
    color: C.pink,
    glow: C.pinkGlow,
    detail:
      'すべてのミドルウェアチェックを通過後、実際のビジネスロジックを実行。userId, role がコンテキストとして保証された状態で動作。',
    y: 460,
  },
];

const roles = [
  { role: 'general（無料）', desc: '基本機能のみ', color: C.textDim },
  { role: 'pro（有料）', desc: '全機能アクセス', color: C.green },
  { role: 'admin', desc: '管理機能 + 全機能', color: C.external },
];

export default function SLRbacFlow() {
  const [activeNode, setActiveNode] = useState<ActiveNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const centerX = 280;
  const boxW = 260;
  const boxH = 56;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace", position: 'relative' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 28, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.external }}>🛡️</span> RBAC フロー
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
          Rate Limit → JWT Auth → RBAC → Handler
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 660, margin: '0 auto' }}>
        <svg viewBox="0 0 660 560" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="grid-sl-rbac" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="660" height="560" fill="url(#grid-sl-rbac)" opacity="0.5" />

          {/* Pipeline vertical line */}
          <line
            x1={centerX + boxW / 2 + 50}
            y1={80}
            x2={centerX + boxW / 2 + 50}
            y2={500}
            stroke={C.border}
            strokeWidth={1}
            strokeDasharray="4,4"
            opacity={0.3}
          />

          {/* Pipeline nodes */}
          {pipelineNodes.map((node, i) => {
            const x = centerX;
            const y = node.y;
            const show = hoveredNode === node.id || activeNode?.id === node.id;

            return (
              <g key={node.id}>
                {/* Arrow from previous */}
                {i > 0 && (
                  <g>
                    <line
                      x1={x + boxW / 2}
                      y1={pipelineNodes[i - 1].y + boxH}
                      x2={x + boxW / 2}
                      y2={y}
                      stroke={pipelineNodes[i - 1].color}
                      strokeWidth={1.5}
                      opacity={0.4}
                    />
                    <polygon
                      points={`${x + boxW / 2},${y} ${x + boxW / 2 - 5},${y - 8} ${x + boxW / 2 + 5},${y - 8}`}
                      fill={pipelineNodes[i - 1].color}
                      opacity={0.5}
                    />
                    {/* Rejection arrows for middleware nodes */}
                    {i >= 1 && i <= 3 && (
                      <g>
                        <line
                          x1={x + boxW}
                          y1={y + boxH / 2}
                          x2={x + boxW + 80}
                          y2={y + boxH / 2}
                          stroke={C.pink}
                          strokeWidth={1}
                          strokeDasharray="4,3"
                          opacity={0.4}
                        />
                        <text
                          x={x + boxW + 90}
                          y={y + boxH / 2 + 1}
                          fill={C.pink}
                          fontSize={9}
                          fontFamily="'JetBrains Mono', monospace"
                          opacity={0.6}
                          dominantBaseline="middle"
                        >
                          {i === 1 ? '429' : i === 2 ? '401' : '403'}
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* Node box */}
                <g
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() =>
                    setActiveNode(
                      activeNode?.id === node.id
                        ? null
                        : {
                            id: node.id,
                            icon: node.icon,
                            label: node.label,
                            color: node.color,
                            glowColor: node.glow,
                            detail: node.detail,
                          },
                    )
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {show && (
                    <rect
                      x={x - 4}
                      y={y - 4}
                      width={boxW + 8}
                      height={boxH + 8}
                      rx={16}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={1.5}
                      opacity={0.4}
                    />
                  )}
                  <rect
                    x={x}
                    y={y}
                    width={boxW}
                    height={boxH}
                    rx={12}
                    fill={show ? C.surfaceHover : C.surface}
                    stroke={show ? node.color : C.border}
                    strokeWidth={show ? 1.5 : 1}
                  />
                  <rect
                    x={x}
                    y={y}
                    width={boxW}
                    height={boxH}
                    rx={12}
                    fill={node.glow}
                    opacity={show ? 0.5 : 0}
                  />
                  <text
                    x={x + boxW / 2}
                    y={y + boxH / 2 - 7}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={C.text}
                    fontSize={13}
                    fontWeight={600}
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {node.icon} {node.label}
                  </text>
                  <text
                    x={x + boxW / 2}
                    y={y + boxH / 2 + 11}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={C.textDim}
                    fontSize={10}
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {node.sublabel}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Role legend */}
          {roles.map((r, i) => (
            <g key={r.role}>
              <rect
                x={60}
                y={180 + i * 36}
                width={170}
                height={28}
                rx={8}
                fill={C.surface}
                stroke={r.color}
                strokeWidth={1}
                opacity={0.6}
              />
              <text
                x={70}
                y={198 + i * 36}
                fill={r.color}
                fontSize={10}
                fontWeight={600}
                fontFamily="'JetBrains Mono', monospace"
                dominantBaseline="middle"
              >
                {r.role}
              </text>
            </g>
          ))}
          <text
            x={60}
            y={168}
            fill={C.textMuted}
            fontSize={10}
            fontWeight={700}
            fontFamily="'JetBrains Mono', monospace"
            opacity={0.6}
            letterSpacing="0.08em"
          >
            ROLES
          </text>
        </svg>

        <DetailPanel node={activeNode} onClose={() => setActiveNode(null)} />
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, marginTop: 12, opacity: 0.5, textAlign: 'center' }}
      >
        ※ 各ノードをクリックすると詳細が表示されます
      </p>
    </div>
  );
}
