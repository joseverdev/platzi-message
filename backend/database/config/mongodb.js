const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    // console.log('✅ MongoDB connected successfully');

    // Eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDB,
  mongoose,
};
