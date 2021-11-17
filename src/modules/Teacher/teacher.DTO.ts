import Joi from 'joi';

export const createTeacherSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().required().email(),
  gender: Joi.string().valid('male', 'female'),
  address: Joi.string(),
  birthday: Joi.string(),
  password: Joi.string().min(6),
  phone_number: Joi.string().min(9).max(10),
});

export const updateTeacherSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().valid('male', 'female'),
  address: Joi.string(),
  birthday: Joi.string(),
  password: Joi.string().min(6),
  phone_number: Joi.string().min(9).max(10),
});
