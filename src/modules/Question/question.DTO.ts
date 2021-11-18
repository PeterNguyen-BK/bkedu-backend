import Joi from 'joi';

export const createQuestionSchema = Joi.object({
  rating: Joi.number().required(),
  type: Joi.string().valid('essay', 'multi-choice').required(),
  question: Joi.string().required(),
  answer: Joi.alternatives()
    .conditional('type', {
      is: 'multi-choice',
      then: Joi.array().items(Joi.object()),
      otherwise: Joi.object(),
    })
    .required(),
});
