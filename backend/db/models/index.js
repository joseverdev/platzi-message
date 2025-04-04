const { User, UserSchema } = require('./user.model.js');
const { Message, MessageSchema } = require('./message.model.js');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Message.init(MessageSchema, Message.config(sequelize));
}

module.exports = setupModels;
