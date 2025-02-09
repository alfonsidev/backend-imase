import Joi from 'joi';

const name = Joi.string();
const description = Joi.string().min(10);
const image = Joi.string().uri();
const url = Joi.string();

export const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  url: url.required()
});



