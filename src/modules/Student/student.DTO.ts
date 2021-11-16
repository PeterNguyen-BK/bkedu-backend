import Joi from 'joi';

export const createStudentSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().required().email(),
  gender: Joi.string().valid('male', 'female'),
  address: Joi.string(),
  birthday: Joi.date(),
  password: Joi.string().min(6),
  phone_number: Joi.string().min(9).max(10),
  class: Joi.string(),
});
