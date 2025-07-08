const { sequelize } = require('../libs/sequelize.js');
const { createMessageSchema } = require('../schemas/message.schema');
const boom = require('@hapi/boom');
const Conversation = require('../db/models/mongo/conversation.model');
const Message = require('../db/models/mongo/message.model');

const { models } = sequelize;

const MessageService = {
  create: async (req) => {
    let conversationId;

    const sender_id = req.user.sub;

    const existingConversation = await Conversation.findOne({
      participants: { $all: [sender_id, req.body.receiver_id] },
    });

    if (!existingConversation) {
      const newConversation = new Conversation({
        participants: [sender_id, req.body.receiver_id],
        last_message: {
          content: req.body.content,
          sender_id: sender_id,
          timestamp: new Date(),
        },
      });
      await newConversation.save();
      conversationId = newConversation._id;
    } else {
      conversationId = existingConversation._id;
      await Conversation.findByIdAndUpdate(conversationId, {
        last_message: {
          content: req.body.content,
          sender_id: sender_id,
          timestamp: new Date(),
        },
        updated_at: new Date(),
      });
    }

    const message = await Message.create({
      conversation_id: conversationId,
      sender_id: sender_id,
      content: req.body.content,
      type: req.body.type || 'text',
    });
    return message;
  },
  findByConversation: async (conversationId) => {
    const messages = await Message.find({ conversation_id: conversationId })
      .sort({ created_at: 1 })
      .lean();
    return messages;
  },
};

module.exports = MessageService;
