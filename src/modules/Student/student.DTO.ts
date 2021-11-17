import Joi from 'joi';

export const createStudentSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required().email(),
  gender: Joi.string().valid('male', 'female').required(),
  address: Joi.string().required(),
  birthday: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().min(9).max(10).required(),
  class: Joi.string(),
});

export const updateStudentSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().valid('male', 'female'),
  address: Joi.string(),
  birthday: Joi.string(),
  password: Joi.string().min(6),
  phone_number: Joi.string().min(9).max(10),
  class: Joi.string(),
});
