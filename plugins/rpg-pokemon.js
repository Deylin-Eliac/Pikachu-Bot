import fs from 'fs'
import path from 'path'

const usuariosPath = path.join('./src/database/usuarios.json')
const pokemonesPath = path.join('./src/database/pokemones.json')

function cargarJSONSeguro(ruta, defaultValue = {}) {
  try {
    if (!fs.existsSync(ruta)) {
      fs.writeFileSync(ruta, JSON.stringify(defaultValue, null, 2))
      return defaultValue
    }

    const raw = fs.readFileSync(ruta, 'utf-8').trim()

    if (!raw || raw === '') {
      fs.writeFileSync(ruta, JSON.stringify(defaultValue, null, 2))
      return defaultValue
    }

    return JSON.parse(raw)
  } catch (e) {
    throw new Error(`❌ Error al leer el archivo: *${ruta}*\n💥 Detalles: ${e.message}`)
  }
}

let handler = async (m, { conn, args }) => {
  try {
    const userId = m.sender.replace(/[^0-9]/g, '')
    const usuarios = cargarJSONSeguro(usuariosPath)

    // ATRAPAR SÍ
    if (args[0]?.toLowerCase() === 'sí' || args[0]?.toLowerCase() === 'si') {
      if (usuarios[userId]?.pokemon) {
        return m.reply('🧢 Ya atrapaste un Pokémon.')
      }

      const poke = global.pokemonEnEspera?.[userId]
      if (!poke) return m.reply('❗ No hay ningún Pokémon en espera para atrapar.')

      usuarios[userId] = {
        nombre: (await conn.getName(m.sender)) || 'Usuario',
        comida: 3,
        pociones: 1,
        pokemon: {
          id: poke.id,
          nombre: poke.nombre,
          alias: poke.nombre,
          nivel: 1,
          vida: poke.vidaBase,
          vidaMax: poke.vidaBase,
          exp: 0,
          fechaCaptura: new Date().toISOString()
        }
      }

      fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2))
      delete global.pokemonEnEspera[userId]
      return m.reply(`🎉 ¡Has atrapado a *${poke.nombre}*! Usa *.perfil* para verlo.`)
    }

    // ATRAPAR NO
    if (args[0]?.toLowerCase() === 'no') {
      delete global.pokemonEnEspera?.[userId]
      return m.reply('🚶‍♂️ Has ignorado al Pokémon salvaje.')
    }

    // MOSTRAR POKÉMON SALVAJE
    if (usuarios[userId]?.pokemon) {
      return m.reply(`🧢 Ya tienes un Pokémon atrapado: *${usuarios[userId].pokemon.nombre}*\nUsa *.perfil* para verlo.`)
    }

    const pokemones = cargarJSONSeguro(pokemonesPath, [])
    if (!Array.isArray(pokemones) || pokemones.length === 0)
      return m.reply('⚠️ La lista de pokemones está vacía o mal formada.')

    const poke = pokemones[Math.floor(Math.random() * pokemones.length)]

    global.pokemonEnEspera ??= {}
    global.pokemonEnEspera[userId] = poke

    const texto = `🌟 ¡Un Pokémon salvaje apareció!\n\n` +
                  `📛 Nombre: *${poke.nombre}*\n` +
                  `🎯 Tipo: ${poke.tipo.join(', ')}\n` +
                  `❤️ Vida base: ${poke.vidaBase}\n\n` +
                  `¿Quieres atraparlo?\n✍️ Escribe *.atrapar sí* para atraparlo o *.atrapar no* para ignorarlo.`

    await conn.sendFile(m.chat, poke.imagen, 'poke.jpg', texto, m)

  } catch (err) {
    return m.reply(err.message || '❌ Ocurrió un error inesperado.')
  }
}

handler.help = ['atrapar']
handler.tags = ['juegos']
handler.command = ['atrapar']
handler.register = true

export default handler