const { text } = require('express');
const MessageService = require('../services/message.service');

const registerChatHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Cuando un usuario se conecta, lo unimos a una sala con su ID
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('send_message', async (data) => {
      console.log('Message received:', data);

      try {
        // Guardar el mensaje en la base de datos

        const newMessage = await MessageService.create(data);
        console.log('🚀 ~ socket.on ~ newMessage:', newMessage);

        // Enviamos el mensaje solo al destinatario específico usando su user_id
        io.to(data.receiver_id).emit('receive_message', newMessage);

        socket.emit('receive_message', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('message_error', {
          error: 'Error saving message',
          details: error.message,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = { registerChatHandlers };
