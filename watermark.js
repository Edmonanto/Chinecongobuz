// ════════════════════════════════════════════════════════════════════════════
//  Module Watermark — Couvre les marques et logo avec "chinecongobusiness"
//  • Texte diagonal en fond semi-transparent (couvre les logos partout)
//  • Bandeau en bas avec le nom de la boutique
//  • Coins couverts pour bloquer les watermarks d'origine
// ════════════════════════════════════════════════════════════════════════════

const { Jimp, loadFont, HorizontalAlign, VerticalAlign } = require('jimp');
const path = require('path');

const BRAND     = 'chinecongobusiness';
const FONT_DIR  = path.join(__dirname, 'node_modules/@jimp/plugin-print/fonts/open-sans');

// Couleurs (ARGB en hexa 32-bit)
const WHITE      = 0xFFFFFFFF;
const BLACK      = 0xFF000000;
const SEMI_WHITE = 0xAAFFFFFF; // blanc 67% opaque
const SEMI_BLACK = 0xBB000000; // noir  73% opaque

async function applyWatermark(inputPath, outputPath) {
  const img = await Jimp.read(inputPath);
  const W   = img.bitmap.width;
  const H   = img.bitmap.height;

  // ── 1. Bandeau bas (fond noir semi-transparent) ──────────────────────────
  const bannerH = Math.max(40, Math.round(H * 0.10));
  for (let y = H - bannerH; y < H; y++) {
    for (let x = 0; x < W; x++) {
      img.setPixelColor(SEMI_BLACK, x, y);
    }
  }

  // ── 2. Couvrir les coins (zones fréquentes de logos/watermarks) ───────────
  const cornerW = Math.round(W * 0.25);
  const cornerH = Math.round(H * 0.15);

  // Coin haut-gauche
  for (let y = 0; y < cornerH; y++) {
    for (let x = 0; x < cornerW; x++) {
      blendPixel(img, x, y, 200);
    }
  }
  // Coin haut-droit
  for (let y = 0; y < cornerH; y++) {
    for (let x = W - cornerW; x < W; x++) {
      blendPixel(img, x, y, 200);
    }
  }
  // Coin bas-gauche
  for (let y = H - cornerH; y < H - bannerH; y++) {
    for (let x = 0; x < cornerW; x++) {
      blendPixel(img, x, y, 200);
    }
  }
  // Coin bas-droit
  for (let y = H - cornerH; y < H - bannerH; y++) {
    for (let x = W - cornerW; x < W; x++) {
      blendPixel(img, x, y, 200);
    }
  }

  // ── 3. Textes avec jimp print ─────────────────────────────────────────────
  const font64W = await loadFont(path.join(FONT_DIR, 'open-sans-64-white/open-sans-64-white.fnt'));
  const font32W = await loadFont(path.join(FONT_DIR, 'open-sans-32-white/open-sans-32-white.fnt'));
  const font16W = await loadFont(path.join(FONT_DIR, 'open-sans-16-white/open-sans-16-white.fnt'));
  const font32B = await loadFont(path.join(FONT_DIR, 'open-sans-32-black/open-sans-32-black.fnt'));

  // Marque en diagonal au centre (grande, semi-lisible)
  // On l'imprime 3x décalé pour un effet répété sur toute l'image
  const diagPositions = [
    { x: Math.round(W * 0.05), y: Math.round(H * 0.30) },
    { x: Math.round(W * 0.20), y: Math.round(H * 0.55) },
    { x: Math.round(W * 0.10), y: Math.round(H * 0.15) },
  ];

  for (const pos of diagPositions) {
    img.print({
      font  : font32W,
      x     : pos.x,
      y     : pos.y,
      text  : BRAND,
      maxWidth : Math.round(W * 0.8),
    });
  }

  // Texte dans le bandeau bas — centré, bien visible
  img.print({
    font     : font64W,
    x        : 0,
    y        : H - bannerH + Math.round((bannerH - 64) / 2),
    text     : { text: BRAND, alignmentX: HorizontalAlign.CENTER },
    maxWidth : W,
    maxHeight: bannerH,
  });

  // Texte ombré dans coins (double couche pour lisibilité)
  // Coin haut-gauche
  img.print({ font: font32B, x: 6,  y: 6,  text: BRAND, maxWidth: cornerW });
  img.print({ font: font32W, x: 4,  y: 4,  text: BRAND, maxWidth: cornerW });

  // Coin haut-droit (approximation — jimp n'a pas d'alignement droit natif)
  img.print({ font: font16W, x: W - cornerW, y: 8, text: BRAND, maxWidth: cornerW });

  await img.write(outputPath);
  return outputPath;
}

// Mélange un pixel avec du blanc (alpha = force du blanc 0-255)
// Jimp v1 encode les couleurs en RGBA: R<<24 | G<<16 | B<<8 | A (unsigned 32-bit)
function blendPixel(img, x, y, strength) {
  const orig = img.getPixelColor(x, y) >>> 0;   // forcer unsigned 32-bit
  const r = (orig >>> 24) & 0xFF;
  const g = (orig >>> 16) & 0xFF;
  const b = (orig >>>  8) & 0xFF;
  const a = (orig)         & 0xFF;

  const t  = strength / 255;
  const nr = Math.round(r * (1 - t) + 255 * t);
  const ng = Math.round(g * (1 - t) + 255 * t);
  const nb = Math.round(b * (1 - t) + 255 * t);

  // Reconstruire en unsigned 32-bit avec >>> 0
  const color = (((nr & 0xFF) * 0x1000000) + ((ng & 0xFF) << 16) + ((nb & 0xFF) << 8) + (a & 0xFF)) >>> 0;
  img.setPixelColor(color, x, y);
}

module.exports = { applyWatermark };
