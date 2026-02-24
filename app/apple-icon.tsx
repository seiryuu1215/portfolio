import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3b82f6',
          borderRadius: '40px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 100, fontWeight: 700, color: 'white' }}>S</div>
      </div>
    ),
    { ...size },
  );
}
