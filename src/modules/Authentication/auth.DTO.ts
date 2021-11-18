import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const refreshSchema = Joi.object({
  refresh_token: Joi.string().required(),
});
