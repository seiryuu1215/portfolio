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
  anthropic: '#d4a574',
  anthropicGlow: 'rgba(212,165,116,0.15)',
  fal: '#f472b6',
  falGlow: 'rgba(244,114,182,0.15)',
  green: '#3ecf8e',
  amber: '#fbbf24',
  purple: '#a78bfa',
  cyan: '#22d3ee',
};

interface AIFeature {
  id: string;
  icon: string;
  title: string;
  color: string;
  input: string;
  output: string;
  detail: string;
  proOnly: boolean;
}

const features: AIFeature[] = [
  {
    id: 'overview',
    icon: '&#128161;',
    title: 'AI概要補完',
    color: C.anthropic,
    input: '用語名 (例: "React Server Components")',
    output: '200文字程度の概要テキスト',
    detail:
      'Anthropic Claude API で用語名から概要を自動生成。ワンクリックで overview フィールドを埋める。Free: 10回/日, Pro: 50回/日。',
    proOnly: false,
  },
  {
    id: 'extract',
    icon: '&#128269;',
    title: '長文用語抽出',
    color: C.amber,
    input: '技術文書テキスト (案件概要、職務経歴書等)',
    output: 'IT用語リスト + カテゴリ + 推定習熟度',
    detail:
      'テキスト貼り付けから IT 用語を一括抽出・登録。AI がカテゴリ分類と習熟度を推定。Free: 月2回, Pro: 無制限。',
    proOnly: false,
  },
  {
    id: 'interview',
    icon: '&#128172;',
    title: '面談シミュレーター',
    color: C.purple,
    input: 'ユーザーの登録用語 + 習熟度データ',
    output: 'チャット形式の面談練習 (質問/回答/フィードバック)',
    detail:
      'AI が面談官役となり、ユーザーの登録用語に基づいた技術質問を出題。回答へのフィードバック付き。Pro 限定。',
    proOnly: true,
  },
  {
    id: 'learning',
    icon: '&#128218;',
    title: '学習プラン生成',
    color: C.green,
    input: '診断結果 + 登録用語 + 習熟度',
    output: '推奨学習パス (優先度付きステップ)',
    detail:
      '診断で判明した強み/弱みと登録用語データから、個別最適化された学習プランを AI が生成。Pro 限定。',
    proOnly: true,
  },
  {
    id: 'gap',
    icon: '&#128200;',
    title: 'ギャップ分析',
    color: C.cyan,
    input: '案件要件テキスト + 登録用語',
    output: '不足スキルリスト + 推奨アクション',
    detail:
      '案件の要件と自分の登録用語を比較し、不足している技術スキルを特定。キャッチアップ優先度を提示。Pro 限定。',
    proOnly: true,
  },
];

const falFeature = {
  id: 'typeicon',
  icon: '&#127912;',
  title: 'タイプアイコン生成',
  color: C.fal,
  detail:
    'fal.ai Flux Pro で 16 エンジニアタイプ x キャラクター画像を生成。診断結果ページと OGP 画像に使用。バッチ生成で事前にキャッシュ。',
};

export default function DevDexAIIntegration() {
  const [activeFeature, setActiveFeature] = useState<string>('overview');

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, margin: 0 }}>
          <span style={{ color: C.anthropic }}>&#129302;</span> DevDex - AI Integration
        </h2>
        <p style={{ color: C.textDim, fontSize: 11, margin: '6px 0 0', letterSpacing: '0.1em' }}>
          ANTHROPIC CLAUDE API + FAL.AI FLUX PRO
        </p>
      </div>

      {/* Provider badges */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 10,
            background: `${C.anthropic}10`,
            border: `1px solid ${C.anthropic}30`,
          }}
        >
          <span style={{ color: C.anthropic, fontSize: 12, fontWeight: 700 }}>
            Anthropic Claude
          </span>
          <span style={{ color: C.textDim, fontSize: 10, marginLeft: 8 }}>5 AI features</span>
        </div>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 10,
            background: `${C.fal}10`,
            border: `1px solid ${C.fal}30`,
          }}
        >
          <span style={{ color: C.fal, fontSize: 12, fontWeight: 700 }}>fal.ai Flux Pro</span>
          <span style={{ color: C.textDim, fontSize: 10, marginLeft: 8 }}>Image generation</span>
        </div>
      </div>

      {/* Feature flow diagram */}
      <div style={{ maxWidth: 720, margin: '0 auto 24px' }}>
        <svg viewBox="0 0 720 180" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="ai-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={C.border}
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="720" height="180" fill="url(#ai-grid)" opacity="0.5" />

          {/* Input */}
          <rect
            x={20}
            y={60}
            width={130}
            height={52}
            rx={10}
            fill={C.surface}
            stroke={C.blue}
            strokeWidth={1.5}
          />
          <rect x={20} y={60} width={130} height={52} rx={10} fill={C.blue} opacity={0.08} />
          <text
            x={85}
            y={82}
            textAnchor="middle"
            fill={C.text}
            fontSize={11}
            fontWeight={600}
            fontFamily="'JetBrains Mono',monospace"
          >
            User Input
          </text>
          <text
            x={85}
            y={100}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
          >
            text / terms / data
          </text>

          {/* Arrow to API */}
          <line
            x1={150}
            y1={86}
            x2={190}
            y2={86}
            stroke={C.textDim}
            strokeWidth={1.2}
            opacity={0.5}
          />
          <polygon points="190,86 184,82 184,90" fill={C.textDim} opacity={0.6} />

          {/* API Route */}
          <rect
            x={190}
            y={60}
            width={130}
            height={52}
            rx={10}
            fill={C.surface}
            stroke={C.green}
            strokeWidth={1.5}
          />
          <rect x={190} y={60} width={130} height={52} rx={10} fill={C.green} opacity={0.08} />
          <text
            x={255}
            y={82}
            textAnchor="middle"
            fill={C.text}
            fontSize={11}
            fontWeight={600}
            fontFamily="'JetBrains Mono',monospace"
          >
            API Route
          </text>
          <text
            x={255}
            y={100}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
          >
            rate limit check
          </text>

          {/* Arrow to Claude */}
          <line
            x1={320}
            y1={86}
            x2={360}
            y2={86}
            stroke={C.textDim}
            strokeWidth={1.2}
            opacity={0.5}
          />
          <polygon points="360,86 354,82 354,90" fill={C.textDim} opacity={0.6} />

          {/* Claude API */}
          <rect
            x={360}
            y={60}
            width={140}
            height={52}
            rx={10}
            fill={C.surface}
            stroke={C.anthropic}
            strokeWidth={1.5}
          />
          <rect x={360} y={60} width={140} height={52} rx={10} fill={C.anthropic} opacity={0.08} />
          <text
            x={430}
            y={82}
            textAnchor="middle"
            fill={C.anthropic}
            fontSize={11}
            fontWeight={600}
            fontFamily="'JetBrains Mono',monospace"
          >
            Claude API
          </text>
          <text
            x={430}
            y={100}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
          >
            prompt + context
          </text>

          {/* Arrow to Output */}
          <line
            x1={500}
            y1={86}
            x2={540}
            y2={86}
            stroke={C.textDim}
            strokeWidth={1.2}
            opacity={0.5}
          />
          <polygon points="540,86 534,82 534,90" fill={C.textDim} opacity={0.6} />

          {/* Output */}
          <rect
            x={540}
            y={60}
            width={150}
            height={52}
            rx={10}
            fill={C.surface}
            stroke={C.amber}
            strokeWidth={1.5}
          />
          <rect x={540} y={60} width={150} height={52} rx={10} fill={C.amber} opacity={0.08} />
          <text
            x={615}
            y={82}
            textAnchor="middle"
            fill={C.text}
            fontSize={11}
            fontWeight={600}
            fontFamily="'JetBrains Mono',monospace"
          >
            Structured Output
          </text>
          <text
            x={615}
            y={100}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
          >
            JSON / text / stream
          </text>

          {/* Rate limit label */}
          <text
            x={360}
            y={30}
            textAnchor="middle"
            fill={C.textDim}
            fontSize={9}
            fontFamily="'JetBrains Mono',monospace"
            opacity={0.6}
          >
            Free: 10 calls/day | Pro: 50 calls/day
          </text>
        </svg>
      </div>

      {/* Feature selector */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 20,
          maxWidth: 720,
          margin: '0 auto 20px',
        }}
      >
        {features.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFeature(f.id)}
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              border: `1px solid ${activeFeature === f.id ? f.color : C.border}`,
              background: activeFeature === f.id ? `${f.color}10` : C.surface,
              color: activeFeature === f.id ? f.color : C.textMuted,
              fontSize: 10,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono',monospace",
              transition: 'all 0.2s',
            }}
          >
            {f.icon} {f.title}
            {f.proOnly && <span style={{ marginLeft: 4, color: C.fal, fontSize: 8 }}>PRO</span>}
          </button>
        ))}
      </div>

      {/* Active feature detail */}
      {features
        .filter((f) => f.id === activeFeature)
        .map((feature) => (
          <div
            key={feature.id}
            style={{
              maxWidth: 700,
              margin: '0 auto 24px',
              background: C.surface,
              border: `1px solid ${feature.color}`,
              borderRadius: 12,
              padding: '20px 24px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ color: feature.color, fontSize: 16, fontWeight: 700 }}>
                {feature.icon} {feature.title}
              </span>
              {feature.proOnly && (
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: `${C.fal}15`,
                    color: C.fal,
                    fontSize: 9,
                    fontWeight: 600,
                  }}
                >
                  Pro Only
                </span>
              )}
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div style={{ color: C.blue, fontSize: 10, fontWeight: 600, marginBottom: 4 }}>
                  INPUT
                </div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>{feature.input}</div>
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div style={{ color: C.amber, fontSize: 10, fontWeight: 600, marginBottom: 4 }}>
                  OUTPUT
                </div>
                <div style={{ color: C.textMuted, fontSize: 11 }}>{feature.output}</div>
              </div>
            </div>
            <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.7 }}>
              {feature.detail}
            </div>
          </div>
        ))}

      {/* fal.ai section */}
      <div
        style={{
          maxWidth: 700,
          margin: '0 auto',
          background: C.surface,
          border: `1px solid ${C.fal}`,
          borderRadius: 12,
          padding: '16px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ color: C.fal, fontSize: 14, fontWeight: 700 }}>
            {falFeature.icon} {falFeature.title}
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              background: `${C.fal}15`,
              color: C.fal,
              fontSize: 9,
              fontWeight: 600,
            }}
          >
            fal.ai Flux Pro
          </span>
        </div>
        <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.7 }}>{falFeature.detail}</div>
      </div>

      <p
        style={{ color: C.textDim, fontSize: 10, textAlign: 'center', marginTop: 16, opacity: 0.5 }}
      >
        ※ 各機能をクリックして詳細を確認 | 5 Claude features + 1 image generation
      </p>
    </div>
  );
}
