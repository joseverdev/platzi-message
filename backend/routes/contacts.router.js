const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const contactService = require('../services/contact.service');

const validatorHandler = require('../middlewares/validatorHandler');

const { createContactSchema } = require('../schemas/contact.schema');

const router = express.Router();
const userService = new UserService();

router.post(
  '/add',
  validatorHandler(createContactSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user_id, contact_id } = req.body;

      if (user_id === contact_id) {
        throw new Error(
          'No puedes agregarte a ti mismo como contacto. Por favor selecciona un usuario diferente.',
        );
      }

      await userService.findById(user_id);
      await userService.findById(contact_id);

      const isAlreadyContact = await contactService.checkIfContact(
        user_id,
        contact_id,
      );

      if (isAlreadyContact) {
        return res.status(409).json({
          success: false,
          message: 'Este usuario ya esta en la lista de contactos',
        });
      }

      const newContact = await contactService.addContact({
        user_id,
        contact_id,
      });

      res.status(201).json({
        success: true,
        message: 'Contacto agregado exitosamente.',
        data: newContact,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const contacts = await contactService.allContacts(req.user.sub);

      res.json({
        success: true,
        data: contacts,
      });
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
