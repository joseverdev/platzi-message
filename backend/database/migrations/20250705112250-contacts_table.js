'use strict';

const { ContactSchema, CONTACT_TABLE } = require('../models/contact.model.js');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CONTACT_TABLE, ContactSchema);

    // Agregar índices para performance
    await queryInterface.addIndex(CONTACT_TABLE, ['usuario_id']);
    await queryInterface.addIndex(CONTACT_TABLE, ['contacto_id']);

    // Índice único para evitar contactos duplicados
    await queryInterface.addIndex(
      CONTACT_TABLE,
      ['usuario_id', 'contacto_id'],
      {
        unique: true,
        name: 'unique_contact_pair',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CONTACT_TABLE);
  },
};
