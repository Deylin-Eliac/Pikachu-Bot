import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  //if (!global.owner.includes(m.sender)) {
    //return m.reply('❌ Solo el creador o desarrolladores pueden usar este comando.')
  }

  if (!text) {
    return m.reply(`⚠️ Escribe el texto que quieres enviar al canal.\n\nEjemplo:\n${usedPrefix + command} ¡Atención! Mantenimiento programado esta noche. 🌙`)
  }

  // Variables necesarias
  const canalJid = global.idchannel || '0029VawF8fBBvvsktcInIz3m@newsletter'
 /* const icono = global.icono || 'https://i.imgur.com/4M34hi2.jpeg'
  const redes = global.redes || 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'*/
  const pie = global.textoBot || '🔋 Gracias por usar Pikachu-Bot'
  const dev = global.author || '👑 Creador: Deylin'

  const mensaje = `*⚡ 𝙿𝙸𝙺𝙰𝙲𝙷𝚄 - 𝙱𝙾𝚃 ⚡*\n\n${text}\n\n${pie}`

  try {
    await conn.sendMessage(canalJid, {
      text: mensaje,
      contextInfo: {
        externalAdReply: {
          title: "🪧 AVISO ENVIADO POR EL BOT",
          body: dev,
          thumbnailUrl: icono,
          sourceUrl: redes,
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: true
        }
      }
    })

    await m.reply('✅ Aviso enviado correctamente al canal.')
  } catch (e) {
    console.error(e)
    await m.reply('❌ Error al enviar el mensaje. Asegúrate que el bot esté en el canal como administrador.')
  }
}

handler.help = ['aviso <texto>']
handler.tags = ['owner']
handler.command = ['aviso']
handler.rowner = true

export default handler