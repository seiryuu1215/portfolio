import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Seiryuu | フリーランスエンジニア';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* アクセントライン */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
          }}
        />

        {/* 名前 */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#ededed',
            letterSpacing: '-0.02em',
          }}
        >
          Seiryuu
        </div>

        {/* 肩書き */}
        <div
          style={{
            fontSize: 28,
            color: '#3b82f6',
            marginTop: 16,
            fontWeight: 500,
          }}
        >
          フリーランスエンジニア
        </div>

        {/* 技術スタック */}
        <div
          style={{
            fontSize: 18,
            color: '#888888',
            marginTop: 24,
          }}
        >
          Next.js / React / TypeScript / Firebase
        </div>
      </div>
    ),
    { ...size },
  );
}
