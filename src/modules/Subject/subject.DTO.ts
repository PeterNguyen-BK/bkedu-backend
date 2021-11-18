import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required(),
  class: Joi.string().required(),
  post: Joi.array().items(Joi.object()),
  exercises: Joi.array().items(Joi.object()),
  files: Joi.array().items(Joi.object()),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string(),
  class: Joi.string(),
  post: Joi.array().items(Joi.object()),
  exercises: Joi.array().items(Joi.object()),
  files: Joi.array().items(Joi.object()),
});
