import Joi from 'joi'

const name = Joi.string();
const email = Joi.string().email();
const message = Joi.string().min(10);

export const createContactSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  message: message.required(),
});

