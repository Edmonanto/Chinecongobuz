// ════════════════════════════════════════════════════════════════════════════
//  Bot Publication 1688 — Canal WhatsApp Congolais
//  Publie un nouveau produit toutes les 2 heures automatiquement
//  Prix majorés de 30% | Texte en français | Images incluses
// ════════════════════════════════════════════════════════════════════════════

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');
const qrcode   = require('qrcode-terminal');
const qrcodeLib = require('qrcode');
const schedule  = require('node-schedule');
const axios     = require('axios');
const fs        = require('fs');
const path      = require('path');
const http      = require('http');
const { Boom }  = require('@hapi/boom');

const PRODUCTS            = require('./products_catalog.js');
const { applyWatermark }  = require('./watermark.js');

// ─── Serveur HTTP minimal pour Railway (évite le kill du process) ────────────
const PORT = process.env.PORT || 3000;
let   currentQR  = null;
let   isConnected = false;

const server = http.createServer((req, res) => {
  if (isConnected) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:40px;background:#f0f0f0">
        <h2>✅ Bot 1688 — WhatsApp Connecté</h2>
        <p>Canal : <b>${CHANNEL_JID}</b></p>
        <p>Publication toutes les <b>${INTERVAL_H} heures</b></p>
        <p>Produits au catalogue : <b>${PRODUCTS.length}</b></p>
        <p style="color:green">🟢 Bot actif et opérationnel</p>
      </body></html>
    `);
  } else if (currentQR) {
    // Afficher le QR code en HTML pour le scanner depuis le navigateur Railway
    qrcodeLib.toDataURL(currentQR, { width: 300 }, (err, url) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <html><body style="font-family:sans-serif;text-align:center;padding:40px;background:#fff">
          <h2>📱 Scanner ce QR Code avec WhatsApp</h2>
          <p>Ouvrez WhatsApp → Appareils liés → Scanner</p>
          ${err ? '<p>QR code en cours...</p>' : `<img src="${url}" style="border:2px solid #ccc;border-radius:8px"/>`}
          <p><small>Cette page se rafraîchit automatiquement toutes les 15 secondes</small></p>
          <script>setTimeout(() => location.reload(), 15000)</script>
        </body></html>
      `);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:40px">
        <h2>⏳ Bot 1688 — Démarrage en cours...</h2>
        <script>setTimeout(() => location.reload(), 5000)</script>
      </body></html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`🌐 Serveur Railway actif sur port ${PORT}`);
});

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CHANNEL_JID  = '120363418946332915@newsletter';
const MARKUP       = 1.30;          // +30% sur le prix de base
const INTERVAL_H   = 2;            // toutes les 2 heures
const IMG_CACHE    = './img_cache';      // dossier cache images brutes
const IMG_BRANDED  = './img_branded';    // dossier images watermarkées
// ─────────────────────────────────────────────────────────────────────────────

let sock         = null;
let productIndex = loadIndex();

// ── Persistance de l'index produit ──────────────────────────────────────────
function loadIndex() {
  try {
    const data = fs.readFileSync('./publisher_state.json', 'utf8');
    return JSON.parse(data).productIndex || 0;
  } catch {
    return 0;
  }
}

function saveIndex(idx) {
  fs.writeFileSync('./publisher_state.json', JSON.stringify({ productIndex: idx }));
}

// ── Utilitaires ──────────────────────────────────────────────────────────────
function ts() {
  return new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' });
}

function applyMarkup(price) {
  return Math.ceil(price * MARKUP);
}

// ── Téléchargement image ──────────────────────────────────────────────────────
async function downloadImage(url, filepath) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.1688.com/',
      },
    });
    fs.writeFileSync(filepath, Buffer.from(response.data));
    return true;
  } catch (err) {
    console.warn(`  ⚠️  Image non téléchargée : ${url.substring(0, 60)}...`);
    return false;
  }
}

async function getProductImages(product) {
  if (!fs.existsSync(IMG_CACHE))   fs.mkdirSync(IMG_CACHE);
  if (!fs.existsSync(IMG_BRANDED)) fs.mkdirSync(IMG_BRANDED);

  const images    = [];
  const urls      = product.imageUrls || [];
  const MAX_IMAGES = 3;

  for (let i = 0; i < Math.min(urls.length, MAX_IMAGES); i++) {
    const filename        = `prod_${product.id}_img${i + 1}.jpg`;
    const rawPath         = path.join(IMG_CACHE,   filename);
    const brandedFilename = `branded_${filename}`;
    const brandedPath     = path.join(IMG_BRANDED, brandedFilename);

    // Télécharger l'image brute si absente
    if (!fs.existsSync(rawPath)) {
      const ok = await downloadImage(urls[i], rawPath);
      if (!ok) continue;
    }

    // Appliquer le watermark "chinecongobusiness" si pas encore fait
    if (!fs.existsSync(brandedPath)) {
      try {
        console.log(`  🖊️  Watermark → ${filename}`);
        await applyWatermark(rawPath, brandedPath);
      } catch (err) {
        console.warn(`  ⚠️  Watermark échoué pour ${filename} :`, err.message);
        // Fallback : envoyer l'image brute
        if (fs.existsSync(rawPath)) images.push({ filepath: rawPath, filename });
        continue;
      }
    }

    if (fs.existsSync(brandedPath)) {
      images.push({ filepath: brandedPath, filename: brandedFilename });
    }
  }

  return images;
}

// ── Formatage du message produit ──────────────────────────────────────────────
function buildProductMessage(product) {
  const header = `${product.emoji} *${product.name.toUpperCase()}*\n`;
  const origin = `🇨🇳 _Importé directement depuis la Chine_\n\n`;

  const sizesBlock = product.sizes.map(s => {
    const price = applyMarkup(s.basePrice);
    return `  ${s.label} : *${price}$*`;
  }).join('\n');

  const body = `📐 *Tailles & Prix :*\n${sizesBlock}\n\n`;

  const moqLine  = `❗️ *Minimum exigé :* ${product.moq}\n\n`;
  const orderCTA =
    `🛒 *NB :*\n` +
    `Pour commander, faites une capture d'écran avec le prix, ` +
    `envoyez-moi en *privé* et précisez le nombre de pièces souhaité.\n\n` +
    `📲 *Commandez maintenant — Stock limité !*`;

  return `${header}${origin}${body}${moqLine}${orderCTA}`;
}

// ── Envoi du produit au canal ─────────────────────────────────────────────────
async function publishProduct() {
  if (!sock) {
    console.error(`[${ts()}] ❌ WhatsApp non connecté.`);
    return;
  }

  const product = PRODUCTS[productIndex % PRODUCTS.length];
  const message = buildProductMessage(product);

  console.log(`\n[${ts()}] 📦 Publication : ${product.name}`);

  try {
    // Télécharger les images
    const images = await getProductImages(product);

    if (images.length > 0) {
      // Envoyer avec images
      for (let i = 0; i < images.length; i++) {
        const { filepath } = images[i];
        const imageBuffer  = fs.readFileSync(filepath);
        const caption      = i === 0 ? message : '';  // Caption seulement sur la 1ère image

        await sock.sendMessage(CHANNEL_JID, {
          image: imageBuffer,
          caption: caption,
          mimetype: 'image/jpeg',
        });

        if (i < images.length - 1) {
          await new Promise(r => setTimeout(r, 1500)); // petit délai entre images
        }
      }
      console.log(`[${ts()}] ✅ Produit publié avec ${images.length} image(s).`);
    } else {
      // Envoyer texte uniquement si aucune image disponible
      await sock.sendMessage(CHANNEL_JID, { text: message });
      console.log(`[${ts()}] ✅ Produit publié (texte seulement).`);
    }

    // Avancer l'index et sauvegarder
    productIndex++;
    saveIndex(productIndex);

    const next = PRODUCTS[productIndex % PRODUCTS.length];
    console.log(`[${ts()}] ⏭️  Prochain produit dans ${INTERVAL_H}h : ${next.name}`);

  } catch (err) {
    console.error(`[${ts()}] ❌ Erreur publication :`, err.message);
  }
}

// ── Planification toutes les 2 heures ────────────────────────────────────────
function startScheduler() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║   ✅  Bot 1688 — Publication Automatique Actif !              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`\n   Canal    : ${CHANNEL_JID}`);
  console.log(`   Intervalle : toutes les ${INTERVAL_H} heures`);
  console.log(`   Produits  : ${PRODUCTS.length} articles au catalogue`);
  console.log(`   Majoration : +${Math.round((MARKUP - 1) * 100)}% sur tous les prix`);
  console.log(`\n   📦 Index actuel : Produit ${(productIndex % PRODUCTS.length) + 1}/${PRODUCTS.length}`);
  console.log(`   → ${PRODUCTS[productIndex % PRODUCTS.length].name}\n`);

  // Publier immédiatement au démarrage
  publishProduct();

  // Puis toutes les 2 heures (0 */2 * * * = à la minute 0, toutes les 2h)
  schedule.scheduleJob(`0 */${INTERVAL_H} * * *`, () => {
    publishProduct();
  });

  console.log('⏰ Scheduler actif. (Ctrl+C pour arrêter)\n');
}

// ── Connexion WhatsApp ────────────────────────────────────────────────────────
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version }          = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth : state,
    printQRInTerminal: false,
    logger: require('pino')({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQR   = qr;
      isConnected = false;
      console.log('\n📱 QR Code disponible — deux façons de scanner :');
      console.log('   1. Ouvrez l\'URL Railway dans votre navigateur (QR visuel)');
      console.log('   2. QR en terminal ci-dessous :\n');
      qrcode.generate(qr, { small: true });
      console.log('\n⏳ En attente du scan...\n');
    }

    if (connection === 'open') {
      currentQR   = null;
      isConnected = true;
      console.log(`\n[${ts()}] ✅ WhatsApp connecté !\n`);
      startScheduler();
    }

    if (connection === 'close') {
      isConnected = false;
      const shouldReconnect = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut
        : true;

      console.warn(`[${ts()}] ⚠️  Déconnecté. Reconnexion : ${shouldReconnect}`);
      if (shouldReconnect) {
        setTimeout(connectToWhatsApp, 10000);
      } else {
        console.error(`[${ts()}] 🔴 Session expirée. Supprimez le Volume auth_info_baileys/ sur Railway et relancez.`);
      }
    }
  });
}

// ── Démarrage ─────────────────────────────────────────────────────────────────
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   🇨🇩  Bot 1688 → Canal WhatsApp — Marché Congolais          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');
console.log(`📦 Catalogue : ${PRODUCTS.length} produits importés de Chine`);
console.log(`🕐 Publication : toutes les ${INTERVAL_H} heures`);
console.log(`💰 Majoration  : +30% sur chaque prix\n`);
console.log('🚀 Connexion WhatsApp en cours...\n');

connectToWhatsApp();
