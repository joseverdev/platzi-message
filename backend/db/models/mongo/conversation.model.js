const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: {
    type: [String], // UUIDs de usuarios (referencia lógica a Postgres)
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length >= 2;
      },
      message: 'Una conversación debe tener al menos dos participantes',
    },
  },
  last_message: {
    content: { type: String },
    sender_id: { type: String }, // UUID del último que envió mensaje
    timestamp: { type: Date },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
