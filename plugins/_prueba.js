import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'

const handler = async (m, { conn }) => {
  if (!m.quoted || !m.quoted.audio) throw '🎤 Responde a un audio para transcribirlo a texto.'

  try {
    const audio = await m.quoted.download()
    const filePath = path.join('./temp', `${Date.now()}.ogg`)
    fs.writeFileSync(filePath, audio)

    const form = new FormData()
    form.append('audio', fs.createReadStream(filePath))

    // Usamos un servidor público que usa Whisper (ejemplo demostrativo)
    const res = await fetch('https://whisper.lablab.ai/asr', {
      method: 'POST',
      body: form
    })

    const data = await res.json()
    fs.unlinkSync(filePath)

    if (data && data.text) {
      await m.reply(`🗣️ *Texto transcrito:*\n${data.text}`)
    } else {
      throw 'No se pudo transcribir el audio.'
    }

  } catch (e) {
    console.error(e)
    m.reply('❎ Error al transcribir la nota de voz.')
  }
}

handler.help = ['voztexto']
handler.tags = ['tools', 'ia']
handler.command = ['voztexto', 'transcribir']
handler.register = true

export default handler