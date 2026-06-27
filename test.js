const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');

async function test() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({ version, auth: state, logger: require('pino')({ level: 'silent' }) });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', async ({ connection }) => {
    if (connection === 'open') {
      await sock.sendMessage('120363410751257422@newsletter', {
        text: 'Congo Culture Quotidien - Bot actif sur Railway 24h/24'
      });
      console.log('Message envoye avec succes');
      process.exit(0);
    }
  });
}
test();
