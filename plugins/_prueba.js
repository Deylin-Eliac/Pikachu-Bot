let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*⚠️ Escribe el texto que quieres enviar a tu canal.*\n\nEjemplo:\n${usedPrefix + command} ¡Atención! Nueva actualización este fin de semana 🚀`);

  const canalJid = '0029VawF8fBBvvsktcInIz3m@newsletter';
  const canalUrl = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m';

  try {
    
    let nombreCanal = await conn.getName(canalJid).catch(() => null);
    
    if (!nombreCanal) {
      return m.reply(`❌ *El bot no tiene permisos para enviar mensajes al canal.*\n\n👉 Asegúrate de que el bot sea *editor* o *admin* del canal.\n🔗 ${canalUrl}`);
    }

    const msg = {
      text: `╭───────⟡\n│ *📢 AVISO IMPORTANTE*\n╰───────⟡\n\n${text}\n\n⟣ _Enviado automáticamente por tu bot_`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: canalJid,
          serverMessageId: 100,
          newsletterName: 'Canal Oficial 🛠️'
        },
        externalAdReply: {
          showAdAttribution: true,
          title: 'Canal Oficial del Bot 📢',
          body: 'Toca para ver más actualizaciones',
          mediaType: 1,
          previewType: 'PHOTO',
          thumbnailUrl: null,
          renderLargerThumbnail: true,
          sourceUrl: canalUrl
        }
      }
    };

    await conn.sendMessage(canalJid, msg, { quoted: m });
    await m.reply('✅ *Mensaje enviado correctamente al canal.*');

  } catch (e) {
    console.error(e);
    await m.reply('❌ Ocurrió un error al enviar el mensaje al canal.');
  }
};

handler.help = ['aviso <texto>'];
handler.tags = ['owner'];
handler.command = ['aviso'];
handler.rowner = true;

export default handler;