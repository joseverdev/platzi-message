const { registerChatHandlers } = require('./chat.socket');

const initializeSockets = (io) => {
  // Register all socket handlers here
  registerChatHandlers(io);
  
  // You can add more socket handlers here in the future
};

module.exports = { initializeSockets };
