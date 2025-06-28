const getMensajeSistema = ({ comando = '', verifyaleatorio = 'verify', user2 = 'Entrenador', edades = ['18'] }) => {
  const opcionesEdad = edades.map(edad => `🔰 _#${verifyaleatorio} ${user2}.${edad}_`).join('\n');

  return {
    smsrowner: `⚡️✨ *¡Pika-Pika! Este comando* 〘 ${comando} 〙 *solo puede ser usado por el Maestro Pokémon (propietario principal).*`,
    smsowner: `🧢 *〘 ${comando} 〙 es un movimiento secreto reservado para los entrenadores desarrolladores. ¡No tienes la medalla necesaria!*`,
    smsmods: `🔰 *〘 ${comando} 〙 está restringido solo a moderadores. ¡Tu Pokédex aún no está registrada como tal!*`,
    smspremium: `💎 *〘 ${comando} 〙 es un beneficio premium solo para entrenadores élite. ¡Sigue entrenando, joven entrenador!*`,
    smsgroup: `👥 *〘 ${comando} 〙 solo puede usarse en una Liga Pokémon (grupo). Aquí estás en el Centro Pokémon (privado).*`,
    smsprivate: `📩 *〘 ${comando} 〙 es una técnica que solo funciona en modo 1 vs 1 (chat privado). No es efectiva en multibatallas.*`,
    smsadmin: `🎖️ *〘 ${comando} 〙 necesita que seas un Líder de Gimnasio (admin). ¡No tienes suficientes medallas!*`,
    smsbotAdmin: `🤖 *¡Pikachu está confundido! El bot necesita ser admin para usar* 〘 ${comando} 〙. *Hazlo evolucionar con ese permiso.*`,
    smsrestrict: `⛔ *¡Movimiento bloqueado!* Esta función está desactivada por el Profesor Oak. ¡Ningún Pikachu puede usarla por ahora!*`,

    smsunreg: `🌟 *¡Pika-Pikaaa!* ⚡\n\n🐭 Para usar 〘 *${comando}* 〙 primero debes estar registrado en mi Pokédex.\n\n🎮 *Usa uno de estos comandos para registrarte:*\n${opcionesEdad}\n\n📛 ¡Sin registro, no hay aventura, entrenador! 💥`,

    smsqr: `
╔══════════════════════════╗
║ ⚡🐭  P I K A C H U   B O T  ⚡ 
╠══════════════════════════╣
║   ╭───(⚡◕ᴥ◕⚡)───╮         
║   │  P I K A   │ P I K A  
║   │   C H U !  │ C H U !  
║   ╰─────────────╯         
╠══════════════════════════╣
║ 📡  Sub-Bot – Modo QR        
╟──────────────────────────╢
║ ⟿ ¡Pika Pika! Escanea este  
║    código QR con otro       
║    dispositivo o desde PC   
║    para ser un *Sub-Bot*    
║                            
║ ➥ ❶ Toca ⋮ (tres rayitos)   
║ ➥ ❷ Selecciona “Dispositivos
║       vinculados”           
║ ➥ ❸ Escanea y conéctate al 
║       poder eléctrico ⚡     
╟──────────────────────────╢
║ ⚠  Expira en ❺❹ seg.        
║   ¡No dejes que te atrape   
║     la sobrecarga!          
╚══════════════════════════╝`,

    smscode: `
╔══════════════════════════╗
║ ✨🐭  P I K A C H U   B O T  ✨ 
╠══════════════════════════╣
║   ╭───(⚡◕ᴥ◕⚡)───╮         
║   │  P I K A   │ C H U !  
║   │   C O D E  │   ⚡      
║   ╰─────────────╯         
╠══════════════════════════╣
║ 🛠️  Sub-Bot – Modo Código    
╟──────────────────────────╢
║ ⟿ Usa este código para un   
║   irte con la fuerza        
║    eléctrica de Pikachu ⚡   
║                            
║ ➥ ❶ Abre ⋮ (tres rayitos)   
║ ➥ ❷ “Dispositivos vinculados”
║ ➥ ❸ Vincular con número     
║ ➥ ❹ Ingresa el código ¡y    
║       Pikaaa! Ya eres parte 
║       del equipo eléctrico  
╟──────────────────────────╢
║ ⚠  Si ya tienes otra sesión 
║    abierta, desconecta para 
║    evitar sobrecarga ⚡      
╚══════════════════════════╝`
  }
}

export default getMensajeSistema