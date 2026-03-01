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

interface Layer {
  id: string;
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
  detail: string;
  codeExample: string;
}

const layers: Layer[] = [
  {
    id: 'errorHandler',
    icon: '🛡️',
    label: 'withErrorHandler',
    sublabel: 'try-catch + Sentry + 500',
    color: C.pink,
    glow: C.pinkGlow,
    detail:
      '最外層のエラーハンドラ。すべての未処理例外をキャッチし、Sentry に報告して 500 レスポンスを返却。エラーラベルを指定してデバッグを容易にする。',
    codeExample: 'withErrorHandler(handler, "label")',
  },
  {
    id: 'auth',
    icon: '🔐',
    label: 'withAuth',
    sublabel: 'セッション検証 + ctx注入',
    color: C.green,
    glow: C.greenGlow,
    detail:
      'NextAuth の getServerSession でセッションを検証。未認証なら 401 を返却。認証済みなら userId と role をコンテキストに注入してハンドラに渡す。',
    codeExample: 'withAuth(async (req, { userId, role }) => { ... })',
  },
  {
    id: 'admin',
    icon: '👑',
    label: 'withAdmin',
    sublabel: 'admin ロール必須',
    color: C.yellow,
    glow: C.yellowGlow,
    detail:
      'withAuth の上位互換。認証チェックに加えて role === "admin" を検証。管理者以外は 403 Forbidden を返却。',
    codeExample: 'withAdmin(async (req, ctx) => { ... })',
  },
  {
    id: 'permission',
    icon: '🔧',
    label: 'withPermission',
    sublabel: 'カスタム権限チェック',
    color: C.external,
    glow: C.externalGlow,
    detail:
      '汎用的な権限チェックデコレータ。isPro, isAdmin 等の判定関数とエラーメッセージを受け取り、条件を満たさない場合は 403 を返却。',
    codeExample: 'withPermission(isPro, "PRO限定", handler)',
  },
];

export default function SLMiddleware() {
  const [activeNode, setActiveNode] = useState<ActiveNode | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const centerX = 330;
  const startY = 80;
  const layerPadding = 20;
  const innerBoxH = 52;
  const gapY = 16;

  // Calculate nested box dimensions
  const totalLayers = layers.length;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace", position: 'relative' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 28, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.external }}>🔧</span> ミドルウェア合成パターン
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
          Function Composition / Decorator Pattern
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 660, margin: '0 auto' }}>
        <svg viewBox="0 0 660 520" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="grid-sl-mw" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="660" height="520" fill="url(#grid-sl-mw)" opacity="0.5" />

          {/* Nested boxes - outermost to innermost */}
          {layers.map((layer, i) => {
            const depth = i;
            const x = 60 + depth * layerPadding;
            const y = startY + depth * (innerBoxH + gapY);
            const w = 540 - depth * layerPadding * 2;
            const h = (totalLayers - depth) * (innerBoxH + gapY) + layerPadding;
            const show = hoveredLayer === layer.id || activeNode?.id === layer.id;

            return (
              <g
                key={layer.id}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() =>
                  setActiveNode(
                    activeNode?.id === layer.id
                      ? null
                      : {
                          id: layer.id,
                          icon: layer.icon,
                          label: layer.label,
                          color: layer.color,
                          glowColor: layer.glow,
                          detail: layer.detail,
                        },
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={14}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth={show ? 2 : 1}
                  strokeDasharray={show ? 'none' : '8,4'}
                  opacity={show ? 0.6 : 0.25}
                />
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={14}
                  fill={layer.color}
                  opacity={show ? 0.06 : 0.02}
                />
                {/* Label at top-left */}
                <text
                  x={x + 14}
                  y={y + 18}
                  fill={layer.color}
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="'JetBrains Mono', monospace"
                  opacity={show ? 0.9 : 0.6}
                  letterSpacing="0.05em"
                >
                  {layer.icon} {layer.label}
                </text>
                <text
                  x={x + 14}
                  y={y + 34}
                  fill={C.textDim}
                  fontSize={9}
                  fontFamily="'JetBrains Mono', monospace"
                  opacity={show ? 0.7 : 0.4}
                >
                  {layer.sublabel}
                </text>
              </g>
            );
          })}

          {/* Inner handler box */}
          {(() => {
            const depth = totalLayers;
            const x = 60 + depth * layerPadding + 10;
            const y = startY + depth * (innerBoxH + gapY) + 4;
            const w = 540 - depth * layerPadding * 2 - 20;
            const h = 44;

            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={10}
                  fill={C.surface}
                  stroke={C.accent}
                  strokeWidth={1.5}
                />
                <text
                  x={x + w / 2}
                  y={y + h / 2 - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={C.accent}
                  fontSize={13}
                  fontWeight={700}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  ⚡ Handler
                </text>
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={C.textDim}
                  fontSize={9}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  userId, role が保証された状態
                </text>
              </g>
            );
          })()}

          {/* Code examples on the right */}
          <text
            x={40}
            y={420}
            fill={C.textMuted}
            fontSize={10}
            fontWeight={700}
            fontFamily="'JetBrains Mono', monospace"
            opacity={0.5}
            letterSpacing="0.08em"
          >
            使用例
          </text>

          {[
            {
              label: '認証付きAPI:',
              code: 'withErrorHandler(withAuth(handler), "label")',
              color: C.green,
            },
            {
              label: '管理者のみ:',
              code: 'withErrorHandler(withAdmin(handler), "Admin")',
              color: C.yellow,
            },
            {
              label: 'Pro限定:',
              code: 'withErrorHandler(withPermission(isPro, msg, handler), "Pro")',
              color: C.external,
            },
          ].map((ex, i) => (
            <g key={ex.label}>
              <text
                x={40}
                y={445 + i * 24}
                fill={ex.color}
                fontSize={9}
                fontWeight={600}
                fontFamily="'JetBrains Mono', monospace"
                opacity={0.7}
              >
                {ex.label}
              </text>
              <text
                x={40 + ex.label.length * 5.5 + 8}
                y={445 + i * 24}
                fill={C.textDim}
                fontSize={9}
                fontFamily="'JetBrains Mono', monospace"
              >
                {ex.code}
              </text>
            </g>
          ))}
        </svg>

        <DetailPanel node={activeNode} onClose={() => setActiveNode(null)} />
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, marginTop: 12, opacity: 0.5, textAlign: 'center' }}
      >
        ※ 各レイヤーをクリックすると詳細が表示されます
      </p>
    </div>
  );
}
