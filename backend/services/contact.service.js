const { sequelize } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');

const { models } = sequelize;

const contactService = {
  addContact: async (data) => {
    try {
      const newContact = await models.Contact.create(data);
      return newContact.get({ plain: true });
    } catch (error) {
      throw boom.badRequest('Error al agregar contacto');
    }
  },

  allContacts: async (user_id) => {
    try {
      const contacts = await sequelize.query(
        `SELECT u.user_id, u.fullname, u.email, u.avatar
         FROM contacts c
         JOIN users u ON c.contact_id = u.user_id
         WHERE c.user_id = :user_id`,
        {
          replacements: { user_id },
          type: sequelize.QueryTypes.SELECT,
        },
      );

      return contacts;
    } catch (error) {
      throw boom.badRequest('Error al obtener contactos');
    }
  },

  checkIfContact: async (user_id, contact_id) => {
    try {
      const contact = await models.Contact.findOne({
        where: {
          user_id: user_id, // EN INGLÉS
          contact_id: contact_id, // EN INGLÉS
        },
        raw: true,
      });
      return !!contact;
    } catch (error) {
      throw boom.badRequest('Error al verificar contacto');
    }
  },
};

module.exports = contactService;
