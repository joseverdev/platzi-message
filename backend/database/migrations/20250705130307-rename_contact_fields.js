'use strict';

const { ContactSchema, CONTACT_TABLE } = require('../models/contact.model.js');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(CONTACT_TABLE, 'usuario_id', 'user_id');
    await queryInterface.renameColumn(
      CONTACT_TABLE,
      'contacto_id',
      'contact_id',
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(CONTACT_TABLE, 'user_id', 'usuario_id');
    await queryInterface.renameColumn(
      CONTACT_TABLE,
      'contact_id',
      'contacto_id',
    );
  },
};
