//© código creado por Deylin 
//https://github.com/Deylin-eliac 
//➤  no quites créditos 

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const GRUPO_STAFF = '120363402481697721@g.us' // ← ID del grupo del staff

async function obtenerPais(numero) {
  try {
    let number = numero.replace("@s.whatsapp.net", "");
    const res = await fetch(`https://g-mini-ia.vercel.app/api/infonumero?numero=${number}`);
    const data = await res.json();
    if (data && data.pais) return data.pais;
    if (data && data.bandera && data.nombre) return `${data.bandera} ${data.nombre}`;
    return "🌐 Desconocido";
  } catch {
    return "🌐 Desconocido";
  }
}

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;

  const who = m.messageStubParameters?.[0];
  if (!who) return;

  const taguser = `@${who.split("@")[0]}`;
  const chat = global.db?.data?.chats?.[m.chat] || {};
  const totalMembers = participants.length;
  const date = new Date().toLocaleString("es-ES", { timeZone: "America/Mexico_City" });
  const pais = await obtenerPais(who);

  
  const participante = participants.find(p => p.id === who) || {};
  const rol = participante.admin === 'superadmin' ? '👑 Superadmin' :
              participante.admin === 'admin' ? '🛡️ Administrador' : '👤 Miembro';

  let ppUser = 'https://raw.githubusercontent.com/Deylin-Eliac/Pikachu-Bot/refs/heads/main/src/IMG-20250613-WA0194.jpg';

  try { ppUser = await conn.profilePictureUrl(who, 'image') } catch {}

  const frasesBienvenida = [
    "¡Pika Pika! Bienvenido al grupo.",
    "¡Un nuevo rayo de energía se une a nosotros!",
    "Pikachu está feliz de tenerte aquí ⚡",
    "¡Que comience la aventura, entrenador!",
    "Este grupo ahora tiene más chispa con tu llegada."
  ];
  const frasesDespedida = [
    "Pikachu te dice adiós con una descarga de cariño.",
    "Un entrenador deja el grupo... ¡Suerte!",
    "¡Hasta la próxima! Recuerda tus Pokéballs.",
    "El grupo pierde voltaje sin ti ⚡",
    "Pikachu te extrañará 🥺"
  ];

  if (!chat.welcome) return;

  const enviarMensaje = async (tipo, frase) => {
    const texto = tipo === 'bienvenida' ? `
*🎉──『 𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑰𝑫𝑶/𝑨 』──⚡*
👤 *Usuario:* ${taguser}
🌐 *País Detectado:* ${pais}
💬 *Grupo:* *${groupMetadata.subject}*
👥 *Miembros Totales:* *${totalMembers + 1}*
📆 *Fecha:* *${date}*

🚀 *Mensaje de Bienvenida:*
> ${frase}

📲 Usa */menu* para descubrir lo que puedo hacer.
🎮 ¡Disfruta y participa con respeto!`.trim()
    :
    `
*👋──『 𝑫𝑬𝑺𝑷𝑬𝑫𝑰𝑫𝑨 』──⚡*
👤 *Usuario:* ${taguser}
🌐 *País Detectado:* ${pais}
💬 *Grupo:* *${groupMetadata.subject}*
👥 *Miembros Restantes:* *${totalMembers - 1}*
📆 *Fecha:* *${date}*

💔 *Mensaje de Despedida:*
> ${frase}

🕊️ Le deseamos lo mejor en su camino.`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: ppUser },
      caption: texto,
      mentions: [who]
    });
  };

  
  if (m.chat === GRUPO_STAFF) {
    const esIngreso = m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD;
    const imagenStaff = 'https://raw.githubusercontent.com/Deylin-Eliac/Pikachu-Bot/main/src/staff-banner.jpg';

    const mensajeStaff = esIngreso
      ? `
*🛡️──『 NUEVO INGRESO AL STAFF 』──⚙️*
👤 *Usuario:* ${taguser}
🎖️ *Rol:* ${rol}
🌐 *País Detectado:* ${pais}
🕐 *Fecha:* *${date}*
📌 *Grupo Interno:* *${groupMetadata.subject}*
👥 *Miembros Totales:* *${totalMembers + 1}*

✅ *Estado:* Nuevo miembro ha sido integrado al equipo administrativo.


⚠️ Usa tus privilegios con responsabilidad. ¡Bienvenido al equipo!
`.trim()
      : `
*📤──『 SALIDA DE STAFF DETECTADA 』──⚠️*
👤 *Usuario:* ${taguser}
🎖️ *Rol:* ${rol}
🌐 *País Detectado:* ${pais}
🕐 *Fecha:* *${date}*
📌 *Grupo Interno:* *${groupMetadata.subject}*
👥 *Miembros Restantes:* *${totalMembers - 1}*

❌ *Estado:* Se ha registrado la salida de un miembro del equipo.


🕊️ Gracias por su tiempo y aportes mientras formó parte del staff.
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imagenStaff },
      caption: mensajeStaff,
      mentions: [who]
    });
    return;
  }

  
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    await enviarMensaje('bienvenida', frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)]);
  }
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
  ) {
    await enviarMensaje('despedida', frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)]);
  }
}