const express = require('express');
const passport = require('passport');
const Conversation = require('@models/nosql/conversation.model');
const MessageService = require('../services/message.service');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.sub;

      const conversations = await Conversation.find({
        participants: userId,
      })
        .sort({ updated_at: -1 })
        .lean();

      res.status(200).json({
        success: true,
        data: conversations,
        message: 'Conversations retrieved successfully',
      });
    } catch (error) {
      console.error('Error in /conversations router file', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },
);

router.get(
  '/:conversationId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { conversationId } = req.params;

      const messages = await MessageService.findByConversation(conversationId);

      res.status(200).json({
        success: true,
        data: messages,
        message: 'Conversations retrieved successfully',
      });
    } catch (error) {
      console.log('Error in /conversations router file', error);
      res.status(500).json('Internal Server Error');
    }
  },
);

module.exports = router;
