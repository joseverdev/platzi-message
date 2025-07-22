const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  sender_id: {
    type: String, // UUID del usuario (de PostgreSQL)
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'image', 'audio', 'video'],
    default: 'text',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  read_by: {
    type: [String], // array de UUIDs
    default: [],
  },
});

module.exports = mongoose.model('Message', messageSchema);
