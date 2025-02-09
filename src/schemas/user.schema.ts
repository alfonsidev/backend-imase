import Joi from 'joi';

const id = Joi.string().guid();
const username = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(6).max(30);
const role = Joi.string().min(5);

export const createUserSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

export const getUserSchema = Joi.object({
  id: id.required(),
});


// id : ecd2b2e2-710d-471b-9c5f-f4d1215e1038
