const express = require('express');
const UserService = require('../services/user.service.js');
const {
  getUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const passport = require('passport');

const router = express.Router();
const service = new UserService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.find();

      const safeUsers = users.map(user => {
        delete user.password;
        return user;
      })

      res.json(safeUsers);
    } catch (err) {
      next(err);
    }
  });

router.get('/:id', validatorHandler(getUserSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});



router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      delete user.dataValues.password;
      res.json(user);
    } catch (err) {
      console.log(err)
      next(err);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.send(`Elemento con id ${user.id} eliminado`);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
