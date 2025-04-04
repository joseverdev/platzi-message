const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string().alphanum().min(3).max(50);
const name = Joi.string().min(3).max(50);
const password = Joi.string().min(6).max(50);

const createUserSchema = Joi.object({
  name: name.required(),
  username: username.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  id,
  name,
  username,
});



const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
