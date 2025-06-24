let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`*⚠️ Escribe el texto que quieres enviar a tu canal.*\n\nEjemplo:\n${usedPrefix + command} ¡Atención! Nueva actualización este fin de semana 🚀`);
  }

  const canalJid = '0029VawF8fBBvvsktcInIz3m@newsletter'; 
  const canalUrl = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'; 

  try {
    
    const msg = {
      text: `╭───⊷ *📢 AVISO IMPORTANTE*\n╰────────────⟡\n\n${text}\n\n╭─⊷ _Enviado automáticamente por tu bot_`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: 'Canal Oficial del Bot 📢',
          body: 'Toca para ver más actualizaciones',
          mediaType: 1,
          previewType: 'PHOTO',
          renderLargerThumbnail: true,
          sourceUrl: canalUrl
        }
      }
    };

    await conn.sendMessage(canalJid, msg);
    await m.reply('✅ *Mensaje enviado correctamente al canal.*');

  } catch (e) {
    console.error('ERROR AL ENVIAR AL CANAL:', e);
    await m.reply('❌ Ocurrió un error al enviar el mensaje al canal.\n\n' + (e?.message || e));
  }
};

handler.help = ['aviso <texto>'];
handler.tags = ['owner'];
handler.command = ['aviso'];
handler.rowner = true;

export default handler;