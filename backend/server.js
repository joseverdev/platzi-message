require('module-alias/register');

const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('@/app');
const config = require('@config');
const { connectMongoDB } = require('@database/config/mongodb');
const { registerChatHandlers } = require('@/sockets/chat.socket'); // ← Importar

async function startServer() {
  try {
    await connectMongoDB();

    // ✅ Crear servidor HTTP
    const httpServer = createServer(app);

    // ✅ Configurar Socket.IO
    const io = new Server(httpServer, {
      cors: {
        origin: config.frontendUrl,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    // ✅ Registrar handlers de chat
    registerChatHandlers(io);

    // ✅ Iniciar servidor HTTP (no app)
    httpServer.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📦 Environment: ${config.env}`);
      console.log(`🔌 Socket.IO enabled`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
