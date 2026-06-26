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

const HORAIRES = {
  matin : '0 7  * * *',   // 07:00
  midi  : '0 12 * * *',   // 12:00
  soir  : '0 18 * * *',   // 18:00
  nuit  : '0 21 * * *',   // 21:00
};
// ─────────────────────────────────────────────────────────────────────────────

let sock = null;
let channelJid = null;
let dayIndex = 0;

function getContent(slot) {
  return DAILY_CONTENT[dayIndex % DAILY_CONTENT.length][slot];
}

async function sendToChannel(slot) {
  if (!sock || !channelJid) {
    console.error(`[${ts()}] ❌ Bot non connecté ou canal non trouvé.`);
    return;
  }
  const label = { matin: '🌅 Matin', midi: '☀️ Midi', soir: '🌆 Soir', nuit: '🌙 Nuit' }[slot];
  try {
    await sock.sendMessage(channelJid, { text: getContent(slot) });
    console.log(`[${ts()}] ✅ ${label} envoyé (Jour ${dayIndex % 7 + 1})`);
    if (slot === 'nuit') {
      dayIndex++;
      console.log(`[${ts()}] 📅 Passage au Jour ${dayIndex % 7 + 1} demain`);
    }
  } catch (err) {
    console.error(`[${ts()}] ❌ Erreur (${label}) :`, err.message);
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
  console.log('\n⏰ Scheduler actif. Bot en attente...');
  console.log('   (Ctrl+C pour arrêter)\n');

  schedule.scheduleJob(HORAIRES.matin, () => sendToChannel('matin'));
  schedule.scheduleJob(HORAIRES.midi,  () => sendToChannel('midi'));
  schedule.scheduleJob(HORAIRES.soir,  () => sendToChannel('soir'));
  schedule.scheduleJob(HORAIRES.nuit,  () => sendToChannel('nuit'));
}

// ── Démarrage ────────────────────────────────────────────────────────────────
console.log('╔═══════════════════════════════════════════════╗');
console.log('║   🇨🇩  Congo Culture Quotidien — WhatsApp Bot  ║');
console.log('╚═══════════════════════════════════════════════╝\n');
console.log('🚀 Démarrage...\n');

connectToWhatsApp();
