let handler = async (m, { conn }) => {
  const texto = 'Hola';
  const bloqueCodigo = ['```', texto, '```'].join('\n');

  await conn.sendMessage(m.chat, {
    text: bloqueCodigo,
  }, { quoted: m });
};

handler.command = ['copiar'];
export default handler;