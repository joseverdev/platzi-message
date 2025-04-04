const express = require('express');
const passport = require('passport');
const MessageService = require('../services/message.service');

const messageService = new MessageService();
const router = express.Router();


router.get('/chat/:senderId/:receiverId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;
      const messages = await messageService.findByChat(senderId, receiverId);
      res.json(messages);
    } catch (error) {
      console.log('Error in /messages/chat/:senderId/:receiverId router file', error);
      res.status(500).json('Internal Server Error');
    }
  }
);
router.get('/chat/:userId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const chatList = await messageService.findByUser(userId);
      res.json(chatList);
    } catch (error) {
      console.log('Error in /messages/chat/:userId router file', error);
      res.status(500).json('Internal Server Error');
    }
  }
)



module.exports = router;
