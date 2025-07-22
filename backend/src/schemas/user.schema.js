const Joi = require('joi');

const id = Joi.string().guid({ version: ['uuidv4'] });
const fullname = Joi.string().min(3).max(50);
const password = Joi.string().min(8).max(50);
const email = Joi.string().email().min(5).max(100);

const createUserSchema = Joi.object({
  fullname: fullname.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  id,
  fullname,
  email,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
