const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Lista de números a los que se enviará el mensaje
const numeros = [
  '51935419486@c.us', // Número 1 (Argentina)
  // Agrega más números aquí
];

const mensaje = '¡Hola! Este estes es mi bot de whatsapp...';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false, // Cambiar a true si no quieres ver el navegador
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Genera el código QR para la autenticación
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Cuando el cliente esté listo
client.on('ready', () => {
  console.log('Cliente de WhatsApp listo!');

  // Enviar el mensaje a todos los números en la lista
  numeros.forEach((numero) => {
    client.sendMessage(numero, mensaje)
      .then(() => {
        console.log(`Mensaje enviado a ${numero}`);
      })
      .catch((error) => {
        console.error(`Error al enviar mensaje a ${numero}:`, error);
      });
  });
});

// Inicializa el cliente
client.initialize();
