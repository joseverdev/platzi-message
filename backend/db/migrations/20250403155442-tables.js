'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');
const { MESSAGE_TABLE, MessageSchema } = require('../models/message.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(MESSAGE_TABLE, MessageSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(MESSAGE_TABLE);
  }
};
