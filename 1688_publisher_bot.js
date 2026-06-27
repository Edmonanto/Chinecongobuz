// ════════════════════════════════════════════════════════════════════════════
//  Bot Publication 1688 — Canal WhatsApp Congolais
//  Publie un nouveau produit toutes les 2 heures automatiquement
//  Prix majorés de 30% | Texte en français | Images watermarkées
// ════════════════════════════════════════════════════════════════════════════

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');
const qrcode    = require('qrcode-terminal');
const qrcodeLib = require('qrcode');
const schedule  = require('node-schedule');
const axios     = require('axios');
const fs        = require('fs');
const path      = require('path');
const http      = require('http');
const { Boom }  = require('@hapi/boom');

const PRODUCTS           = require('./products_catalog.js');
const { applyWatermark } = require('./watermark.js');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CHANNEL_JID = '120363418946332915@newsletter';
const MARKUP      = 1.30;
const INTERVAL_H  = 2;
const IMG_CACHE   = '/app/img_cache';
const IMG_BRANDED = '/app/img_branded';
// ─────────────────────────────────────────────────────────────────────────────

let sock         = null;
let isConnected  = false;
let currentQR    = null;
let productIndex = loadIndex();
let lastError    = null;
let publishCount = 0;

// ── Persistance index ─────────────────────────────────────────────────────────
function loadIndex() {
  try {
    return JSON.parse(fs.readFileSync('/app/publisher_state.json', 'utf8')).productIndex || 0;
  } catch {
    return 0;
  }
}
function saveIndex(idx) {
  try { fs.writeFileSync('/app/publisher_state.json', JSON.stringify({ productIndex: idx })); } catch {}
}

function ts() {
  return new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' });
}
function applyMarkup(price) {
  return Math.ceil(price * MARKUP);
}

// ── Téléchargement image ──────────────────────────────────────────────────────
async function downloadImage(url, filepath) {
  try {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    // Vérifier que c'est bien une image (pas une page HTML d'erreur)
    const contentType = res.headers['content-type'] || '';
    if (!contentType.includes('image')) {
      console.warn(`  ⚠️  URL ne renvoie pas une image (${contentType}) : ${url.substring(0, 60)}`);
      return false;
    }
    fs.writeFileSync(filepath, Buffer.from(res.data));
    console.log(`  📥 Image téléchargée (${Math.round(res.data.byteLength / 1024)}KB)`);
    return true;
  } catch (err) {
    console.warn(`  ⚠️  Download échoué : ${err.message}`);
    return false;
  }
}

async function getProductImages(product) {
  try {
    if (!fs.existsSync(IMG_CACHE))   fs.mkdirSync(IMG_CACHE,   { recursive: true });
    if (!fs.existsSync(IMG_BRANDED)) fs.mkdirSync(IMG_BRANDED, { recursive: true });
  } catch (e) {
    console.warn('  ⚠️  Impossible de créer les dossiers images :', e.message);
    return [];
  }

  const images = [];
  const urls   = product.imageUrls || [];

  for (let i = 0; i < Math.min(urls.length, 3); i++) {
    const filename    = `prod_${product.id}_img${i + 1}.jpg`;
    const rawPath     = path.join(IMG_CACHE,   filename);
    const brandedPath = path.join(IMG_BRANDED, `branded_${filename}`);

    if (!fs.existsSync(rawPath)) {
      const ok = await downloadImage(urls[i], rawPath);
      if (!ok) continue;
    }

    if (!fs.existsSync(brandedPath)) {
      try {
        console.log(`  🖊️  Watermark → ${filename}`);
        await applyWatermark(rawPath, brandedPath);
      } catch (err) {
        console.warn(`  ⚠️  Watermark échoué :`, err.message);
        if (fs.existsSync(rawPath)) images.push(rawPath);
        continue;
      }
    }

    if (fs.existsSync(brandedPath)) images.push(brandedPath);
  }

  return images;
}

// ── Formatage message ─────────────────────────────────────────────────────────
function buildProductMessage(product) {
  const sizes = product.sizes.map(s =>
    `  ${s.label} : *${applyMarkup(s.basePrice)}$*`
  ).join('\n');

  return (
    `${product.emoji} *${product.name.toUpperCase()}*\n` +
    `🇨🇳 _Importé directement depuis la Chine_\n\n` +
    `📐 *Tailles & Prix :*\n${sizes}\n\n` +
    `❗️ *Minimum exigé :* ${product.moq}\n\n` +
    `🛒 *NB :*\n` +
    `Pour commander, faites une capture d'écran avec le prix, ` +
    `envoyez-moi en *privé* et précisez le nombre de pièces souhaité.\n\n` +
    `📲 *Commandez maintenant — Stock limité !*`
  );
}

// ── Publication produit ───────────────────────────────────────────────────────
async function publishProduct() {
  if (!sock || !isConnected) {
    console.error(`[${ts()}] ❌ WhatsApp non connecté — publication annulée.`);
    lastError = 'WhatsApp non connecté';
    return;
  }

  const product = PRODUCTS[productIndex % PRODUCTS.length];
  const message = buildProductMessage(product);
  console.log(`\n[${ts()}] 📦 Publication produit #${(productIndex % PRODUCTS.length) + 1} : ${product.name}`);

  try {
    // ── Essai 1 : texte + images ──────────────────────────────────────────
    const images = await getProductImages(product);

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageBuffer = fs.readFileSync(images[i]);
        await sock.sendMessage(CHANNEL_JID, {
          image  : imageBuffer,
          caption: i === 0 ? message : '',
          mimetype: 'image/jpeg',
        });
        if (i < images.length - 1) await delay(1500);
      }
      console.log(`[${ts()}] ✅ Publié avec ${images.length} image(s).`);
    } else {
      // ── Fallback : texte uniquement ───────────────────────────────────
      console.log(`  ℹ️  Aucune image disponible → envoi texte seul`);
      await sock.sendMessage(CHANNEL_JID, { text: message });
      console.log(`[${ts()}] ✅ Publié (texte seul).`);
    }

    publishCount++;
    lastError = null;
    productIndex++;
    saveIndex(productIndex);
    console.log(`[${ts()}] ⏭️  Prochain : ${PRODUCTS[productIndex % PRODUCTS.length].name} (dans ${INTERVAL_H}h)`);

  } catch (err) {
    lastError = err.message;
    console.error(`[${ts()}] ❌ ERREUR ENVOI :`, err.message);
    console.error(err.stack);
  }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Scheduler ─────────────────────────────────────────────────────────────────
function startScheduler() {
  console.log(`\n[${ts()}] 🚀 Scheduler démarré — publication immédiate puis toutes les ${INTERVAL_H}h\n`);

  // Publication immédiate au démarrage
  publishProduct();

  // Puis toutes les 2 heures
  schedule.scheduleJob(`0 */${INTERVAL_H} * * *`, () => publishProduct());
}

// ── Serveur HTTP Railway ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {

  // Route /test → déclenche une publication immédiate
  if (req.url === '/test') {
    console.log(`\n[${ts()}] 🧪 TEST manuel déclenché via HTTP`);
    publishProduct().catch(console.error);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('✅ Publication test déclenchée — vérifiez les logs Railway');
    return;
  }

  // Route /status → état du bot en JSON
  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      connected   : isConnected,
      publishCount,
      lastError,
      nextProduct : PRODUCTS[productIndex % PRODUCTS.length]?.name,
      productIndex: productIndex % PRODUCTS.length,
      totalProducts: PRODUCTS.length,
    }, null, 2));
    return;
  }

  // Page principale
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  if (isConnected) {
    const next = PRODUCTS[productIndex % PRODUCTS.length];
    res.end(`
      <html><head><meta charset="utf-8"><title>Bot 1688</title></head>
      <body style="font-family:sans-serif;text-align:center;padding:40px;background:#e8f5e9">
        <h2>✅ Bot 1688 — WhatsApp Connecté</h2>
        <p>Canal : <b>${CHANNEL_JID}</b></p>
        <p>Publications envoyées : <b>${publishCount}</b></p>
        <p>Prochain produit : <b>${next.name}</b></p>
        ${lastError ? `<p style="color:red">⚠️ Dernière erreur : ${lastError}</p>` : ''}
        <p style="color:green;font-size:18px">🟢 Bot actif — publication toutes les ${INTERVAL_H}h</p>
        <br>
        <a href="/test" style="background:#25D366;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:16px">
          📤 Tester un envoi maintenant
        </a>
        &nbsp;
        <a href="/status" style="background:#555;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:16px">
          📊 Voir le statut JSON
        </a>
        <script>setTimeout(() => location.reload(), 30000)</script>
      </body></html>
    `);
  } else if (currentQR) {
    qrcodeLib.toDataURL(currentQR, { width: 300 }, (err, url) => {
      res.end(`
        <html><head><meta charset="utf-8"><title>Scanner QR</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:40px;background:#fff">
          <h2>📱 Scanner ce QR Code avec WhatsApp</h2>
          <p>WhatsApp → ⋮ Menu → Appareils liés → Scanner</p>
          ${err ? '<p>Chargement...</p>' : `<img src="${url}" style="border:3px solid #25D366;border-radius:12px"/>`}
          <p style="color:#888"><small>Rafraîchissement automatique toutes les 15 secondes</small></p>
          <script>setTimeout(() => location.reload(), 15000)</script>
        </body></html>
      `);
    });
  } else {
    res.end(`
      <html><head><meta charset="utf-8"></head>
      <body style="font-family:sans-serif;text-align:center;padding:40px">
        <h2>⏳ Démarrage en cours...</h2>
        <script>setTimeout(() => location.reload(), 4000)</script>
      </body></html>
    `);
  }
});

server.listen(PORT, () => console.log(`🌐 Serveur HTTP actif → port ${PORT}`));

// ── Connexion WhatsApp ────────────────────────────────────────────────────────
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('/app/auth_info_baileys');
  const { version }          = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth             : state,
    printQRInTerminal: false,
    logger           : require('pino')({ level: 'warn' }),  // 'warn' pour voir les vraies erreurs
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQR   = qr;
      isConnected = false;
      console.log('\n📱 QR Code disponible → ouvrez l\'URL Railway dans votre navigateur\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      currentQR   = null;
      isConnected = true;
      console.log(`\n[${ts()}] ✅ WhatsApp connecté !\n`);
      startScheduler();
    }

    if (connection === 'close') {
      isConnected = false;
      const code = lastDisconnect?.error?.output?.statusCode;
      console.warn(`[${ts()}] ⚠️  Déconnecté (code: ${code})`);

      if (code !== DisconnectReason.loggedOut) {
        console.log(`[${ts()}] 🔄 Reconnexion dans 10s...`);
        setTimeout(connectToWhatsApp, 10000);
      } else {
        console.error(`[${ts()}] 🔴 Session expirée — supprimez auth_info_baileys sur Railway et redémarrez.`);
      }
    }
  });
}

// ── Démarrage ─────────────────────────────────────────────────────────────────
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   🇨🇩  Bot 1688 → Canal WhatsApp — Marché Congolais          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');
console.log(`📦 ${PRODUCTS.length} produits | ⏰ toutes les ${INTERVAL_H}h | 💰 +30% marge\n`);

connectToWhatsApp();
