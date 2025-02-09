import Joi from 'joi'

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string().min(10);
const image = Joi.string();
const url = Joi.string();

export const createServiceSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  url: url.required(),
});

export const updateServiceSchema = Joi.object({
  name,
  description,
  image,
  url,
});

export const getServiceSchema = Joi.object({
  id: id.required(),
});

