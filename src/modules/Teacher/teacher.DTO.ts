import Joi from 'joi';

export const createTeacherSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().min(9).max(10),
});

export const updateTeacherSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  phone_number: Joi.string().min(9).max(10),
});
