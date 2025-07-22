const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/message_app');
    console.log('MongoDB connected successfully');
  } catch (err) {


    console.error('MongoDB connection error:', err);


    process.exit(1);
  }
}

connectToMongoDB();
