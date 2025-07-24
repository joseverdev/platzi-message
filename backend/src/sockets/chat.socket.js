const { text } = require('express');
const MessageService = require('../services/message.service');

const registerChatHandlers = (io) => {
  io.on('connect', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // ✅ Unir usuario a su sala personal
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`👤 User ${userId} joined room: ${userId}`);
    });

    socket.on('send_message', async (data) => {
      console.log('📨 Message received:', data);

      try {
        const newMessage = await MessageService.create(data);
        console.log('💾 Message saved:', newMessage);

        if (newMessage.conversation_id) {
          console.log(
            `📬 Emitting message to conversation: ${newMessage.conversation_id}`,
          );
          io.emit('receive_message', newMessage);

          io.emit('conversation_updated', {
            conversation_id: newMessage.conversation_id,
            last_message: {
              content: newMessage.content,
              sender_id: newMessage.sender_id,
              timestamp: newMessage.created_at,
            },
          });
        }

        // ✅ Confirmar al remitente
        socket.emit('message_sent', newMessage);
      } catch (error) {
        console.error('❌ Error saving message:', error);
        socket.emit('message_error', {
          error: 'Error saving message',
          details: error.message,
        });
      }
    });

    // ✅ Unir usuario a conversación específica
    socket.on('join_conversation', (conversationId) => {
      socket.join(conversationId);
      console.log(
        `💬 Socket ${socket.id} joined conversation: ${conversationId}`,
      );
    });

    // ✅ Salir de conversación
    socket.on('leave_conversation', (conversationId) => {
      socket.leave(conversationId);
      console.log(
        `🚪 Socket ${socket.id} left conversation: ${conversationId}`,
      );
    });

    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { registerChatHandlers };
