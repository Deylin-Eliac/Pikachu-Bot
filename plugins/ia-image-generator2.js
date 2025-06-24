/* Código creado por Deylin y API también
https://github.com/deylin-eliac 
  no quites créditos 
 Atte: Deylin-eliac*/



let handler = async (m, { text, conn }) => {

  const texto= ['hola']
  const bloqueCodigo = ['```', texto, '```'].join('\n');
  if (!text) {
    return await conn.reply(m.chat, `${emojis} Escribe el prompt de la imagen. Ejemplo:\n.imagina un dragón azul volando en el espacio`, m, fake)
  }

  await conn.reply(m.chat, `${emojis} Generando imagen de: "${text}", espera un momento...`, m, fake)

  try {
    let prompt = encodeURIComponent(text.trim())
    let imageUrl = `https://anime-xi-wheat.vercel.app/api/ia-img?prompt=${prompt}`

    await conn.sendFile(m.chat, imageUrl, bloqueCodigo, 'imagen.jpg', `🧃 Imagen generada:
https://anime-xi-wheat.vercel.app/api/ia-img?prompt=${prompt}`, m)
  } catch (e) {
    console.error(e)
    m.reply(`❌ Ocurrió un error al generar la imagen:\n${e.message}`)
  }
}

handler.help = ['imagina <prompt>']
handler.tags = ['ia'];
handler.command = ['imgia', 'imagina']

export default handler