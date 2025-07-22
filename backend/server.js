require('module-alias/register');

const app = require('@/app');
const config = require('@config');
const { connectMongoDB } = require('@database/config/mongodb');

async function startServer() {
  try {
    await connectMongoDB();

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📦 Environment: ${config.env}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
