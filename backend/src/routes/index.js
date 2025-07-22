const express = require('express');
const usersRouter = require('./users.router.js');
const authRouter = require('./auth.router.js');
const contactsRouter = require('./contacts.router.js');
const messagesRouter = require('./messages.router.js');
const conversationRouter = require('./conversation.router.js');

const router = express.Router();
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);
router.use('/messages', messagesRouter);
router.use('/conversations', conversationRouter);

module.exports = router;
