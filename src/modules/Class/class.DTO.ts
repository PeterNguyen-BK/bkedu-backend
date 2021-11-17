import Joi from 'joi';

export const createClassSchema = Joi.object({
  name: Joi.string().required(),
  num_of_students: Joi.number(),
  form_teacher: Joi.string(),
});

export const updateClassSchema = Joi.object({
  name: Joi.string(),
  num_of_students: Joi.number(),
  form_teacher: Joi.string(),
});
