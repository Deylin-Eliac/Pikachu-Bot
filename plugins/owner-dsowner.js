import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, `${emojis} Utiliza este comando directamente en el número principal del Bot.`, m, fake);
}
//await conn.reply(m.chat, `${emoji2} Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...`, m, fake);
m.react(rwait)

let sessionPath = `./${sessions}/`

try {

if (!existsSync(sessionPath)) {
return await conn.reply(m.chat, `${emojis} La carpeta está vacía.`, m, fake);
}
let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.reply(m.chat, `${emoji2} La carpeta esta vacía.`, m, fake);
} else {
m.react(done)
await conn.reply(m.chat, `${emojis} Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json.`, m, rcanal);
conn.reply(m.chat, `${emojis} *¡Hola! ¿logras verme?*`, m, fake);

}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err);
await conn.reply(m.chat, `${msm} Ocurrió un fallo.`, m, fake);
}

}
handler.help = ['dsowner']
handler.tags = ['owner']
handler.command = ['delai', 'dsowner', 'clearallsession']
handler.rowner = true;

export default handler