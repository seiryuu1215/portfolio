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
  firebase: '#FFCA28',
  firebaseGlow: 'rgba(255, 202, 40, 0.12)',
  pink: '#f472b6',
  pinkGlow: 'rgba(244, 114, 182, 0.12)',
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

interface Participant {
  id: string;
  x: number;
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
  detail: string;
}

const participants: Participant[] = [
  {
    id: 'user',
    x: 80,
    icon: '👤',
    label: 'ユーザー',
    sublabel: 'Browser',
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'PRO プランへのアップグレードを開始。Stripe Checkout でカード情報を入力し、決済完了後に自動でロールが更新される。',
  },
  {
    id: 'api',
    x: 230,
    icon: '⚙️',
    label: 'API Route',
    sublabel: '/api/stripe/*',
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'Stripe Checkout Session の作成と Webhook イベントの受信を処理。署名検証 + 冪等性チェックで安全な決済処理を保証。',
  },
  {
    id: 'stripe',
    x: 400,
    icon: '💳',
    label: 'Stripe',
    sublabel: 'Checkout/Webhook',
    color: C.pink,
    glow: C.pinkGlow,
    detail:
      'Stripe Checkout で安全なカード決済を処理。Subscription のライフサイクルイベント (created/updated/deleted/payment_failed) を Webhook で通知。',
  },
  {
    id: 'firestore',
    x: 570,
    icon: '🗄️',
    label: 'Firestore',
    sublabel: 'role 更新',
    color: C.firebase,
    glow: C.firebaseGlow,
    detail:
      'Webhook 処理後に users/{uid}.role を "pro" に更新。stripeEvents コレクションでイベント ID を記録し、冪等性を保証。',
  },
];

interface Step {
  from: number;
  to: number;
  label: string;
  y: number;
  dashed?: boolean;
  color?: string;
}

const steps: Step[] = [
  { from: 0, to: 1, label: 'POST /api/stripe/checkout', y: 170 },
  { from: 1, to: 2, label: 'Checkout Session 作成', y: 220, color: C.pink },
  { from: 2, to: 0, label: '決済ページへリダイレクト', y: 270, dashed: true, color: C.pink },
  { from: 0, to: 2, label: 'カード情報入力・決済', y: 320, color: C.pink },
  { from: 2, to: 1, label: 'Webhook: checkout.session.completed', y: 380, color: C.pink },
  { from: 1, to: 1, label: '署名検証 + 冪等性チェック', y: 420 },
  { from: 1, to: 3, label: 'role = "pro"', y: 460, color: C.firebase },
  { from: 1, to: 3, label: 'stripeEvents/{id} 記録', y: 500, dashed: true, color: C.firebase },
];

export default function SLStripeFlow() {
  const [activeNode, setActiveNode] = useState<ActiveNode | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace", position: 'relative' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 28, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.pink }}>💳</span> Stripe 決済フロー
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
          Checkout → Webhook → Role Update
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 660, margin: '0 auto' }}>
        <svg viewBox="0 0 660 580" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="grid-sl-stripe" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="660" height="580" fill="url(#grid-sl-stripe)" opacity="0.5" />

          {/* Participant boxes + lifelines */}
          {participants.map((p) => (
            <g key={p.id}>
              <line
                x1={p.x}
                y1={130}
                x2={p.x}
                y2={550}
                stroke={p.color}
                strokeWidth={1}
                strokeDasharray="4,4"
                opacity={0.2}
              />
              <g
                onClick={() =>
                  setActiveNode(
                    activeNode?.id === p.id
                      ? null
                      : {
                          id: p.id,
                          icon: p.icon,
                          label: p.label,
                          color: p.color,
                          glowColor: p.glow,
                          detail: p.detail,
                        },
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={p.x - 60}
                  y={70}
                  width={120}
                  height={48}
                  rx={12}
                  fill={activeNode?.id === p.id ? C.surfaceHover : C.surface}
                  stroke={activeNode?.id === p.id ? p.color : C.border}
                  strokeWidth={activeNode?.id === p.id ? 1.5 : 1}
                />
                <text
                  x={p.x}
                  y={88}
                  textAnchor="middle"
                  fill={C.text}
                  fontSize={13}
                  fontWeight={600}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {p.icon} {p.label}
                </text>
                <text
                  x={p.x}
                  y={106}
                  textAnchor="middle"
                  fill={C.textDim}
                  fontSize={9}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {p.sublabel}
                </text>
              </g>
            </g>
          ))}

          {/* Message arrows */}
          {steps.map((step, i) => {
            const fromX = participants[step.from].x;
            const toX = participants[step.to].x;
            const isSelf = step.from === step.to;
            const isReturn = step.dashed;
            const hovered = hoveredStep === i;
            const arrowColor = step.color || (isReturn ? C.textDim : C.accent);

            if (isSelf) {
              // Self-referencing arrow (loop)
              return (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <path
                    d={`M ${fromX} ${step.y} C ${fromX + 60} ${step.y} ${fromX + 60} ${step.y + 20} ${fromX} ${step.y + 20}`}
                    fill="none"
                    stroke={arrowColor}
                    strokeWidth={hovered ? 2 : 1.2}
                    opacity={hovered ? 0.8 : 0.5}
                  />
                  <polygon
                    points={`${fromX},${step.y + 20} ${fromX + 8},${step.y + 16} ${fromX + 8},${step.y + 24}`}
                    fill={arrowColor}
                    opacity={0.6}
                  />
                  <rect
                    x={fromX + 30}
                    y={step.y - 2}
                    width={step.label.length * 6.5 + 12}
                    height={16}
                    rx={4}
                    fill={C.bg}
                    opacity={0.9}
                  />
                  <text
                    x={fromX + 36 + step.label.length * 3.25}
                    y={step.y + 7}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={hovered ? C.text : C.textDim}
                    fontSize={9}
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {step.label}
                  </text>
                </g>
              );
            }

            const angle = Math.atan2(0, toX - fromX);
            const arrowLen = 8;
            const headX1 = toX - arrowLen * Math.cos(angle - Math.PI / 6);
            const headY1 = step.y - arrowLen * Math.sin(angle - Math.PI / 6);
            const headX2 = toX - arrowLen * Math.cos(angle + Math.PI / 6);
            const headY2 = step.y - arrowLen * Math.sin(angle + Math.PI / 6);
            const midX = (fromX + toX) / 2;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <line
                  x1={fromX}
                  y1={step.y}
                  x2={toX}
                  y2={step.y}
                  stroke={arrowColor}
                  strokeWidth={hovered ? 2 : 1.2}
                  strokeDasharray={isReturn ? '6,4' : 'none'}
                  opacity={hovered ? 0.8 : 0.5}
                />
                <polygon
                  points={`${toX},${step.y} ${headX1},${headY1} ${headX2},${headY2}`}
                  fill={arrowColor}
                  opacity={0.6}
                />
                <rect
                  x={midX - step.label.length * 3.2 - 6}
                  y={step.y - 18}
                  width={step.label.length * 6.4 + 12}
                  height={16}
                  rx={4}
                  fill={C.bg}
                  opacity={0.9}
                />
                <text
                  x={midX}
                  y={step.y - 9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={hovered ? C.text : C.textDim}
                  fontSize={10}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {step.label}
                </text>
              </g>
            );
          })}

          {/* Note */}
          <rect
            x={180}
            y={530}
            width={300}
            height={30}
            rx={8}
            fill={C.surface}
            stroke={C.pink}
            strokeWidth={1}
            strokeDasharray="4,4"
            opacity={0.6}
          />
          <text
            x={330}
            y={549}
            textAnchor="middle"
            fill={C.pink}
            fontSize={10}
            fontWeight={600}
            fontFamily="'JetBrains Mono', monospace"
            opacity={0.8}
          >
            updated / deleted / payment_failed も同様に処理
          </text>
        </svg>

        <DetailPanel node={activeNode} onClose={() => setActiveNode(null)} />
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, marginTop: 12, opacity: 0.5, textAlign: 'center' }}
      >
        ※ 各参加者をクリックすると詳細が表示されます
      </p>
    </div>
  );
}
