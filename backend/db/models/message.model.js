const { DataTypes, Model, Sequelize } = require('sequelize');

const MESSAGE_TABLE = 'messages';

const MessageSchema = {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
};

class Message extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: MESSAGE_TABLE,
      modelName: 'Message',
      timestamps: false
    };
  }
}

module.exports = { MESSAGE_TABLE, MessageSchema, Message };
