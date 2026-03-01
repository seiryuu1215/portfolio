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
  green: '#34d399',
  greenGlow: 'rgba(52, 211, 153, 0.12)',
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
    color: C.accent,
    glow: C.accentGlow,
    detail:
      'メール/パスワードで認証リクエストを送信。認証成功後は JWT セッションで以降のリクエストを認証。',
  },
  {
    id: 'nextauth',
    x: 240,
    icon: '🔑',
    label: 'NextAuth',
    color: C.green,
    glow: C.greenGlow,
    detail:
      'NextAuth v4 が認証フローを管理。Firebase Auth REST API でユーザー認証後、Firestore からロール情報を取得して JWT セッションを発行。',
  },
  {
    id: 'firebase',
    x: 400,
    icon: '🔥',
    label: 'Firebase Auth',
    color: C.firebase,
    glow: C.firebaseGlow,
    detail:
      'Firebase Authentication REST API でメール/パスワード認証を処理。uid を返却し、NextAuth が Firestore のユーザー情報と紐付け。',
  },
  {
    id: 'firestore',
    x: 560,
    icon: '🗄️',
    label: 'Firestore',
    color: C.firebase,
    glow: C.firebaseGlow,
    detail:
      'ユーザー情報（role, subscriptionStatus, stripeCustomerId）を格納。認証時に最新のロール情報を返却し、JWT に含める。',
  },
];

interface Step {
  from: number;
  to: number;
  label: string;
  y: number;
  dashed?: boolean;
}

const steps: Step[] = [
  { from: 0, to: 1, label: 'メール/パスワード', y: 170 },
  { from: 1, to: 2, label: 'REST API 認証', y: 220 },
  { from: 2, to: 1, label: 'uid 返却', y: 270, dashed: true },
  { from: 1, to: 3, label: 'ユーザー情報取得', y: 320 },
  { from: 3, to: 1, label: '{ role, status }', y: 370, dashed: true },
  { from: 1, to: 0, label: 'JWT セッション発行', y: 420, dashed: true },
];

export default function SLAuthFlow() {
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
          <span style={{ color: C.green }}>🔐</span> 認証フロー
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
          NextAuth + Firebase Auth REST API
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 660, margin: '0 auto' }}>
        <svg viewBox="0 0 660 520" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="grid-sl-auth" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="660" height="520" fill="url(#grid-sl-auth)" opacity="0.5" />

          {/* Participant lifelines */}
          {participants.map((p) => (
            <g key={p.id}>
              <line
                x1={p.x}
                y1={130}
                x2={p.x}
                y2={480}
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
                  x={p.x - 55}
                  y={70}
                  width={110}
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
                  {p.id === 'user'
                    ? 'Browser'
                    : p.id === 'nextauth'
                      ? 'v4 JWT'
                      : p.id === 'firebase'
                        ? 'REST API'
                        : 'NoSQL'}
                </text>
              </g>
            </g>
          ))}

          {/* Message arrows */}
          {steps.map((step, i) => {
            const fromX = participants[step.from].x;
            const toX = participants[step.to].x;
            const isReturn = step.dashed;
            const hovered = hoveredStep === i;
            const arrowColor = isReturn ? C.textDim : C.accent;

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
                style={{ cursor: 'default' }}
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
                  x={midX - step.label.length * 3.5 - 6}
                  y={step.y - 18}
                  width={step.label.length * 7 + 12}
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
            y={450}
            width={300}
            height={40}
            rx={8}
            fill={C.surface}
            stroke={C.accent}
            strokeWidth={1}
            strokeDasharray="4,4"
            opacity={0.6}
          />
          <text
            x={330}
            y={465}
            textAnchor="middle"
            fill={C.accent}
            fontSize={10}
            fontWeight={600}
            fontFamily="'JetBrains Mono', monospace"
            opacity={0.8}
          >
            以降のリクエストは JWT で認証
          </text>
          <text
            x={330}
            y={480}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono', monospace"
          >
            role は毎回 Firestore から最新取得
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
