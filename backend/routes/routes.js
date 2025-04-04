const express = require('express');
const usersRouter = require('./users.router.js');
const authRouter = require('./auth.router.js');
const messagesRouter = require('./messages.router.js');

module.exports = function routes(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/messages', messagesRouter);
};
