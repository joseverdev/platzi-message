const { sequelize } = require('../libs/sequelize.js');
const { createMessageSchema } = require('../schemas/message.schema');
const boom = require('@hapi/boom');
const Conversation = require('../db/models/mongo/conversation.model');
const Message = require('../db/models/mongo/message.model');
const { default: mongoose } = require('mongoose');

const { models } = sequelize;

const MessageService = {
  create: async (data) => {
    let conversationId;

    const sender_id = data.user?.sub || data.sender_id;

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [sender_id, data.body?.receiver_id || data.receiver_id],
      },
    });

    if (!existingConversation) {
      const newConversation = new Conversation({
        participants: [sender_id, data.body.receiver_id],
        last_message: {
          content: data.body.content,
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
          content: data.body?.content || data.content,
          sender_id: sender_id,
          timestamp: new Date(),
        },
        updated_at: new Date(),
      });
    }

    console.log(
      'both contacts:',
      sender_id,
      data.body?.receiver_id || data.receiver_id,
    );

    const contactExists = await models.Contact.findOne({
      where: {
        user_id: sender_id,
        contact_id: data.body?.receiver_id || data.receiver_id,
      },
    });

    if (!contactExists) {
      await models.Contact.create({
        user_id: sender_id,
        contact_id: data.body?.receiver_id || data.receiver_id,
      });
    }

    const message = await Message.create({
      conversation_id: conversationId,
      sender_id: sender_id,
      content: data.body?.content || data.content,
      type: data.body?.type || 'text',
    });
    return message;
  },
  findByConversation: async (conversationId) => {
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      throw boom.badRequest('Invalid conversation ID');
    }

    const messages = await Message.find({ conversation_id: conversationId })
      .sort({ created_at: 1 })
      .lean();
    return messages;
  },
};

module.exports = MessageService;
