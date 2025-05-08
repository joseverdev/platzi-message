const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema } = require('../schemas/user.schema');
const authRouter = express.Router();
const AuthService = require('../services/auth.service');
const { jwtSecret } = require('../config/config');
const jwt = require('jsonwebtoken');
const authService = new AuthService();

authRouter.post('/signup',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const bodyLoweCase = {
        ...body,
        username: req.body.username.toLowerCase(),
      }

      const userExist = await authService.find(bodyLoweCase.username);
      if (userExist) {
          return res.status(409).json('El usuario ya existe');
      }

      const newUser = await authService.create(bodyLoweCase);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

authRouter.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        username: user.username,
      }

      const token = jwt.sign(payload, jwtSecret);

      res.cookie('jwt_chat', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // httpOnly: true,
      })

      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  });

authRouter.put('/update-profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { profilePic } = req.body;

      const response = await authService.updateProfile(profilePic, req.user);

      res.json(response);

    } catch (error) {
      console.log('Error in /update-profile router file', error);
      next(error);
    }
  }
)

authRouter.get('/check',
  // passport.authenticate('jwt', { session: false }),
  async(req, res) => {
    try {
      const token = req.cookies.jwt_chat;
      const payload = jwt.verify(token, jwtSecret);
      // console.log('payload', payload);
      const user = await authService.find(payload.username);
      delete user.dataValues.password;
      // console.log('token', token);
      // console.log('user', user.dataValues);
      res.status(200).json(user);
    } catch (error) {
      console.log('Error in /check router file', error);
      res.status(401).json('Unauthorized');
    }
  });

module.exports = authRouter;
