const { text } = require('express');
const MessageService = require('../services/message.service');

const messageService = new MessageService();

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

        console.log({
            text: data.message,
            sender_id: data.from.user_id,
            receiver_id: data.to.user_id
          })


        await messageService.create({
          text: data.message,
          sender_id: data.from.user_id,
          receiver_id: data.to.user_id
        });

        const messageToSend = {
          from: data.from,
          to: data.to,
          message: data.message,
          // id: savedMessage.id,
          // createdAt: savedMessage.createdAt
        };

        // Enviamos el mensaje solo al destinatario específico usando su user_id
        io.to(data.to.user_id).emit('receive_message', messageToSend);

        // También enviamos una copia al remitente
        socket.emit('receive_message', messageToSend);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('message_error', {
          error: 'Error saving message',
          details: error.message
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = { registerChatHandlers };
