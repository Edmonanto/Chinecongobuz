// ════════════════════════════════════════════════════════════════════════════
//  Congo Culture Quotidien — Bot WhatsApp Canal (via Baileys)
//  Envoie 4 posts par jour automatiquement à votre canal WhatsApp
// ════════════════════════════════════════════════════════════════════════════

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');
const DAILY_CONTENT = require('./content.js');
const { Boom } = require('@hapi/boom');

// ─── ⚙️  CONFIG ──────────────────────────────────────────────────────────────
const CHANNEL_JID = '120363410751257422@newsletter';

const HORAIRES = '0 * * * *'; // Chaque heure
// ─────────────────────────────────────────────────────────────────────────────

let sock = null;
let channelJid = null;
let postIndex = 0;

// Aplatir tout le contenu en une liste unique
const ALL_POSTS = DAILY_CONTENT.flatMap(day => [day.matin, day.midi, day.soir, day.nuit]);

// Images Congo — une par post (tourne en boucle)
const IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1280px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Kinshasa_Skyline.jpg/1280px-Kinshasa_Skyline.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty-natural-beauty.jpg/1280px-24701-nature-natural-beauty-natural-beauty.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Congo_River.jpg/1280px-Congo_River.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1280px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
  'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
  'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
  'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800',
  'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
  'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
  'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800',
  'https://images.unsplash.com/photo-1504470695779-75300268aa0e?w=800',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800',
  'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
  'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
];

async function sendToChannel() {
  if (!sock || !channelJid) {
    console.error(`[${ts()}] ❌ Bot non connecté.`);
    return;
  }
  const text = ALL_POSTS[postIndex % ALL_POSTS.length];
  const imageUrl = IMAGES[postIndex % IMAGES.length];
  try {
    await sock.sendMessage(channelJid, {
      image: { url: imageUrl },
      caption: text
    });
    console.log(`[${ts()}] ✅ Post ${postIndex + 1}/${ALL_POSTS.length} envoyé (avec image)`);
    postIndex++;
  } catch (err) {
    console.error(`[${ts()}] ❌ Erreur :`, err.message);
  }
}

function ts() {
  return new Date().toLocaleTimeString('fr-FR');
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false, // On gère le QR manuellement
    logger: require('pino')({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\n📱 Scannez ce QR code avec votre WhatsApp :\n');
      qrcode.generate(qr, { small: true });
      console.log('\n⏳ En attente du scan...\n');
    }

    if (connection === 'open') {
      console.log('\n✅ WhatsApp connecté ! Démarrage du bot...\n');
      startScheduler();
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut
        : true;

      console.warn(`⚠️  Déconnecté. Reconnexion : ${shouldReconnect}`);
      if (shouldReconnect) {
        setTimeout(connectToWhatsApp, 10000);
      }
    }
  });
}

function startScheduler() {
  channelJid = CHANNEL_JID;

  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   ✅  Bot Congo Culture actif !               ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`\n   Canal : ${CHANNEL_JID}`);
  console.log('\n📅 Planning quotidien :');
  console.log('   07:00 → 🌅 Post Matin');
  console.log('   12:00 → ☀️  Post Midi');
  console.log('   18:00 → 🌆 Post Soir');
  console.log('   21:00 → 🌙 Post Nuit');
  console.log('\n⏰ Post toutes les heures. Bot en attente...');
  console.log('   (Ctrl+C pour arrêter)\n');

  schedule.scheduleJob(HORAIRES, () => sendToChannel());
}

// ── Démarrage ────────────────────────────────────────────────────────────────
console.log('╔═══════════════════════════════════════════════╗');
console.log('║   🇨🇩  Congo Culture Quotidien — WhatsApp Bot  ║');
console.log('╚═══════════════════════════════════════════════╝\n');
console.log('🚀 Démarrage...\n');

connectToWhatsApp();
