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

  // キャラエリア: 下側60%
  const CHAR_AREA_TOP = 380;
  const CHAR_AREA_HEIGHT = HEIGHT - CHAR_AREA_TOP - 120; // ラベル+最下部テキスト用に120px確保
  const STRIP_GAP = 6;
  const STRIP_WIDTH = Math.floor((WIDTH - STRIP_GAP * 3) / 4);

  // キャラ画像を縦長にトリミング（中央の縦ストリップを抜き出し）
  const charBuffers = await Promise.all(
    CHARACTERS.map(async (c) => {
      const imgPath = path.join(DEVDEX_ROOT, c.file);
      const metadata = await sharp(imgPath).metadata();
      const w = metadata.width || 1024;
      const h = metadata.height || 1024;

      // 元画像から縦長の中央部分を抽出（横幅の65%、縦は90%）
      const cropW = Math.floor(w * 0.65);
      const cropH = Math.floor(h * 0.92);
      const cropX = Math.floor((w - cropW) / 2);
      const cropY = Math.floor((h - cropH) * 0.3); // やや上寄り（頭が切れないように）

      return sharp(imgPath)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .resize(STRIP_WIDTH, CHAR_AREA_HEIGHT, { fit: 'cover', position: 'top' })
        .png()
        .toBuffer();
    }),
  );

  // 各ストリップのX位置
  const stripPositions = CHARACTERS.map((_, i) => ({
    left: i * (STRIP_WIDTH + STRIP_GAP),
    top: CHAR_AREA_TOP,
  }));

  // カラーオーバーレイ（各ストリップの下部にグラデーション）
  const overlaysSvg = CHARACTERS.map((c, i) => {
    const x = stripPositions[i].left;
    const y = CHAR_AREA_TOP;
    const gradId = `grad${i}`;
    return `
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c.color}" stop-opacity="0"/>
          <stop offset="60%" stop-color="${c.color}" stop-opacity="0"/>
          <stop offset="100%" stop-color="${c.color}" stop-opacity="0.55"/>
        </linearGradient>
      </defs>
      <rect x="${x}" y="${y}" width="${STRIP_WIDTH}" height="${CHAR_AREA_HEIGHT}" fill="url(#${gradId})"/>
    `;
  }).join('');

  // ストリップ下部のテキスト（グループ名＋タイプ名）
  const labelsSvg = CHARACTERS.map((c, i) => {
    const cx = stripPositions[i].left + STRIP_WIDTH / 2;
    const baseY = CHAR_AREA_TOP + CHAR_AREA_HEIGHT;
    return `
      <text x="${cx}" y="${baseY + 22}" text-anchor="middle" fill="white" font-family="sans-serif" font-size="15" font-weight="bold">${c.type}</text>
      <text x="${cx}" y="${baseY + 42}" text-anchor="middle" fill="${c.color}" font-family="sans-serif" font-size="11" font-weight="bold">${c.groupJa} / ${c.group}</text>
    `;
  }).join('');

  // 上部の薄いカラーバー（ストリップ区切り線代わり）
  const topBarsSvg = CHARACTERS.map((c, i) => {
    const x = stripPositions[i].left;
    return `<rect x="${x}" y="${CHAR_AREA_TOP - 3}" width="${STRIP_WIDTH}" height="3" fill="${c.color}" opacity="0.6"/>`;
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
      </defs>

      <!-- 背景 -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>

      <!-- RPG風の装飾（放射状の光芒） -->
      <defs>
        <radialGradient id="glow" cx="50%" cy="15%" r="60%">
          <stop offset="0%" stop-color="#1e3a5f" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#080c18" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

      <!-- 薄いグリッドパターン -->
      <g opacity="0.03">
        ${Array.from({ length: 20 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="${WIDTH}" y2="${i * 50}" stroke="white" stroke-width="0.5"/>`).join('')}
        ${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="${HEIGHT}" stroke="white" stroke-width="0.5"/>`).join('')}
      </g>

      <!-- テキストエリア背景パネル（可読性確保） -->
      <rect x="0" y="0" width="${WIDTH}" height="${CHAR_AREA_TOP}" fill="#080c18" opacity="0.5"/>

      <!-- ===== 上部: タイトルエリア ===== -->
      <text x="${WIDTH / 2}" y="100" text-anchor="middle" fill="url(#titleGrad)" font-family="sans-serif" font-size="62" font-weight="bold" letter-spacing="3">DevDex</text>
      <text x="${WIDTH / 2}" y="142" text-anchor="middle" fill="#f1f5f9" font-family="sans-serif" font-size="19">エンジニアの「内面」を可視化する</text>

      <!-- キャッチコピー（機能アピール） -->
      <text x="${WIDTH / 2}" y="178" text-anchor="middle" fill="#d0d7de" font-family="sans-serif" font-size="12">タイプ診断 × AI学習プラン × 用語管理 × 相性分析 — オールインワン</text>

      <!-- メトリクス -->
      <g>
        <text x="130" y="228" text-anchor="middle" fill="#d0d7de" font-family="monospace" font-size="20">86,000</text>
        <text x="130" y="247" text-anchor="middle" fill="#b0bec5" font-family="sans-serif" font-size="10">行のTypeScript</text>
        <text x="${WIDTH / 2}" y="222" text-anchor="middle" fill="#f59e0b" font-family="monospace" font-size="34" font-weight="bold">5 days</text>
        <text x="${WIDTH / 2}" y="249" text-anchor="middle" fill="#f59e0b" font-family="sans-serif" font-size="12" opacity="0.8">76時間で構築</text>
        <text x="570" y="228" text-anchor="middle" fill="#d0d7de" font-family="monospace" font-size="20">2,100</text>
        <text x="570" y="247" text-anchor="middle" fill="#b0bec5" font-family="sans-serif" font-size="10">テスト</text>
      </g>

      <!-- セパレータ -->
      <line x1="80" y1="275" x2="620" y2="275" stroke="#334155" stroke-width="1"/>

      <!-- 問いかけ + 無料訴求 -->
      <text x="${WIDTH / 2}" y="310" text-anchor="middle" fill="#e2e8f0" font-family="sans-serif" font-size="17" font-weight="bold" letter-spacing="2">あなたはどのタイプ？</text>
      <text x="${WIDTH / 2}" y="340" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="bold">登録不要・無料で診断 → devdex.dev</text>

      <!-- カラーバー -->
      ${topBarsSvg}

      <!-- カラーオーバーレイ（キャラ下部にグラデーション） -->
      ${overlaysSvg}

      <!-- ラベル（キャラ下部にタイプ名・グループ名） -->
      ${labelsSvg}

      <!-- ===== 最下部 ===== -->
      <text x="${WIDTH / 2}" y="${HEIGHT - 28}" text-anchor="middle" fill="#d0d7de" font-family="sans-serif" font-size="12">4軸 × 16タイプ + 対人スタイル診断</text>
      <text x="${WIDTH / 2}" y="${HEIGHT - 10}" text-anchor="middle" fill="#b0bec5" font-family="sans-serif" font-size="11">= 256通りの組み合わせ</text>
    </svg>
  `;

  // SVGベースを作成
  const baseImage = sharp(Buffer.from(svgOverlay));

  // キャラ画像を合成
  const composites = charBuffers.map((buf, i) => ({
    input: buf,
    left: stripPositions[i].left,
    top: stripPositions[i].top,
  }));

  await baseImage.composite(composites).png().toFile(OUTPUT);

  console.log(`Cover generated: ${OUTPUT}`);
}

generateCover().catch(console.error);
