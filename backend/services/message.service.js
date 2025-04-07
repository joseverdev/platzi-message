const { sequelize } = require('../libs/sequelize.js');
const { createMessageSchema } = require('../schemas/message.schema');
const boom = require('@hapi/boom');

const { models } = sequelize;

class MessageService {
  constructor() { }

  async create(data) {
    const { error, value } = createMessageSchema.validate(data);
    if (error) {
      throw boom.badRequest(error);
    }
    const message = await models.Message.create(value);
    return message;
  }

  async findByChat(senderId, receiverId) {
    const messages = await sequelize.query(`
      SELECT * FROM messages
      WHERE (sender_id = ${parseInt(senderId)} AND receiver_id = ${parseInt(receiverId)})
        OR (sender_id = ${parseInt(receiverId)} AND receiver_id = ${parseInt(senderId)})
      ORDER BY messages."created_at" ASC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    return messages;
  }

  async findByUser(userId) {
    const chatList = await sequelize.query(
      "SELECT DISTINCT ON (other_user_id) " +
      "u.user_id AS other_user_id, " +
      "u.name, " +
      "u.\"profilePic\", " +
      "m.text, " +
      "m.\"created_at\", " +
      "m.sender_id AS last_sender_id " +
      "FROM messages m " +
      "JOIN (" +
      "  SELECT *, " +
      "    CASE " +
      "      WHEN sender_id = ? THEN receiver_id " +
      "      ELSE sender_id " +
      "    END AS other_user_id " +
      "  FROM messages " +
      "  WHERE sender_id = ? OR receiver_id = ? " +
      ") sub ON m.message_id = sub.message_id " +
      "JOIN users u ON u.user_id = sub.other_user_id " +
      "ORDER BY other_user_id, m.\"created_at\" DESC " +
      "LIMIT 20",
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: [userId, userId, userId]
    }
    );
    return chatList;
  }

}

module.exports = MessageService;
