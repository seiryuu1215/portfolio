import sharp from 'sharp';
import path from 'path';

const DEVDEX_ROOT = '/Users/seiryuu/Desktop/dev/devdex/public/images/types';
const OUTPUT = '/Users/seiryuu/Desktop/dev/zenn-content/books/claude-code-devdex/cover.png';

const CHARACTERS = [
  { file: 'i-p-d-s.png', group: 'Makers', groupJa: '創造者', type: '職人', color: '#4A90D9' },
  { file: 'i-c-a-r.png', group: 'Drivers', groupJa: '推進者', type: '革命家', color: '#E07B5B' },
  { file: 'e-p-d-r.png', group: 'Keepers', groupJa: '守護者', type: '調停者', color: '#6BBF8A' },
  { file: 'e-c-d-s.png', group: 'Builders', groupJa: '構築者', type: '戦略家', color: '#D4A43A' },
];

async function generateCover() {
  const WIDTH = 700;
  const HEIGHT = 1000;

  // キャラエリア: 下側 — テキストエリアを詰めてキャラを大きく
  const CHAR_AREA_TOP = 360;
  const CHAR_AREA_HEIGHT = HEIGHT - CHAR_AREA_TOP - 95;
  const STRIP_GAP = 6;
  const STRIP_WIDTH = Math.floor((WIDTH - STRIP_GAP * 3) / 4);

  const charBuffers = await Promise.all(
    CHARACTERS.map(async (c) => {
      const imgPath = path.join(DEVDEX_ROOT, c.file);
      const metadata = await sharp(imgPath).metadata();
      const w = metadata.width || 1024;
      const h = metadata.height || 1024;
      const cropW = Math.floor(w * 0.65);
      const cropH = Math.floor(h * 0.92);
      const cropX = Math.floor((w - cropW) / 2);
      const cropY = Math.floor((h - cropH) * 0.3);
      return sharp(imgPath)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .resize(STRIP_WIDTH, CHAR_AREA_HEIGHT, { fit: 'cover', position: 'top' })
        .png()
        .toBuffer();
    }),
  );

  const stripPositions = CHARACTERS.map((_, i) => ({
    left: i * (STRIP_WIDTH + STRIP_GAP),
    top: CHAR_AREA_TOP,
  }));

  const overlaysSvg = CHARACTERS.map((c, i) => {
    const x = stripPositions[i].left;
    const gradId = `grad${i}`;
    return `
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c.color}" stop-opacity="0"/>
          <stop offset="55%" stop-color="${c.color}" stop-opacity="0"/>
          <stop offset="100%" stop-color="${c.color}" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <rect x="${x}" y="${CHAR_AREA_TOP}" width="${STRIP_WIDTH}" height="${CHAR_AREA_HEIGHT}" fill="url(#${gradId})"/>
    `;
  }).join('');

  const labelsSvg = CHARACTERS.map((c, i) => {
    const cx = stripPositions[i].left + STRIP_WIDTH / 2;
    const baseY = CHAR_AREA_TOP + CHAR_AREA_HEIGHT;
    return `
      <text x="${cx}" y="${baseY + 30}" text-anchor="middle" fill="white" font-family="sans-serif" font-size="24" font-weight="bold">${c.type}</text>
      <text x="${cx}" y="${baseY + 55}" text-anchor="middle" fill="${c.color}" font-family="sans-serif" font-size="16" font-weight="bold">${c.groupJa}</text>
    `;
  }).join('');

  const topBarsSvg = CHARACTERS.map((c, i) => {
    const x = stripPositions[i].left;
    return `<rect x="${x}" y="${CHAR_AREA_TOP - 4}" width="${STRIP_WIDTH}" height="4" fill="${c.color}" opacity="0.7"/>`;
  }).join('');

  const svgOverlay = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#080c18;stop-opacity:1" />
          <stop offset="35%" style="stop-color:#0c1225;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#060a14;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#34d399;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="18%" r="55%">
          <stop offset="0%" stop-color="#1e3a5f" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#080c18" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

      <!-- テキストエリア背景 -->
      <rect x="0" y="0" width="${WIDTH}" height="${CHAR_AREA_TOP}" fill="#080c18" opacity="0.45"/>

      <!-- DevDex（でかく） -->
      <text x="${WIDTH / 2}" y="90" text-anchor="middle" fill="url(#titleGrad)" font-family="sans-serif" font-size="90" font-weight="bold" letter-spacing="4">DevDex</text>

      <!-- 5日で構築（タイトル直下・強調） -->
      <text x="${WIDTH / 2}" y="140" text-anchor="middle" fill="#f59e0b" font-family="sans-serif" font-size="34" font-weight="bold">— 実質7日で構築 —</text>

      <!-- サブタイトル -->
      <text x="${WIDTH / 2}" y="190" text-anchor="middle" fill="#f1f5f9" font-family="sans-serif" font-size="26" font-weight="bold">エンジニアの「内面」を可視化する</text>

      <!-- 機能キャッチ -->
      <text x="${WIDTH / 2}" y="230" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="17">タイプ診断 × AI学習 × 用語管理 × 相性分析</text>

      <!-- メトリクス（大きく3つ横並び） -->
      <text x="155" y="290" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="36" font-weight="bold">95,000+</text>
      <text x="155" y="315" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="16">行</text>
      <text x="${WIDTH / 2}" y="290" text-anchor="middle" fill="#60a5fa" font-family="monospace" font-size="36" font-weight="bold">2,400+</text>
      <text x="${WIDTH / 2}" y="315" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="16">テスト</text>
      <text x="545" y="285" text-anchor="middle" fill="#e2e8f0" font-family="sans-serif" font-size="22" font-weight="bold">無料で診断</text>
      <text x="545" y="315" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="bold">devdex.dev</text>

      <!-- あなたはどのタイプ？（キャラ画像上にオーバーレイ） -->
      <text x="${WIDTH / 2}" y="${CHAR_AREA_TOP + 30}" text-anchor="middle" fill="white" font-family="sans-serif" font-size="20" font-weight="bold" letter-spacing="2" opacity="0.9">あなたはどのタイプ？</text>

      <!-- カラーバー -->
      ${topBarsSvg}

      <!-- カラーオーバーレイ -->
      ${overlaysSvg}

      <!-- ラベル -->
      ${labelsSvg}

      <!-- 最下部 -->
      <text x="${WIDTH / 2}" y="${HEIGHT - 12}" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="18">4軸 × 16タイプ + 対人スタイル = 256通り</text>
    </svg>
  `;

  const baseImage = sharp(Buffer.from(svgOverlay));
  const composites = charBuffers.map((buf, i) => ({
    input: buf,
    left: stripPositions[i].left,
    top: stripPositions[i].top,
  }));

  await baseImage.composite(composites).png().toFile(OUTPUT);
  console.log(`Cover generated: ${OUTPUT}`);
}

generateCover().catch(console.error);
