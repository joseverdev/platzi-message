const Joi = require("joi");

const id = Joi.number().integer();
const text = Joi.string();
const sender_id = Joi.number();
const receiver_id = Joi.number();

const createMessageSchema = Joi.object({
  text: text.required(),
  sender_id: sender_id.required(),
  receiver_id: receiver_id.required(),
});

module.exports = { createMessageSchema };
