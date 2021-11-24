import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().min(9).max(10),
  class: Joi.string(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  phone_number: Joi.string().min(9).max(10),
  class: Joi.string(),
});
