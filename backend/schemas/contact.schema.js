const Joi = require('joi');

const uuid = Joi.string().guid({ version: ['uuidv4'] });

const createContactSchema = Joi.object({
  user_id: uuid.required(),
  contact_id: uuid.required(),
});

const updateContactSchema = Joi.object({
  id: uuid,
  user_id: uuid,
  contact_id: uuid,
});

const getContactSchema = Joi.object({
  id: uuid.required(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  getContactSchema,
};
