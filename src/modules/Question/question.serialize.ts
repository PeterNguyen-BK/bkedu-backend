import { IQuest } from '@src/common/entity/question.entity';
import { IQuestionResponse } from './question.model';

export function serializeQuestion(model: IQuest): IQuestionResponse | object {
  if (model)
    return {
      _id: model._id,
      rating: model.rating,
      type: model.type,
      question: model.question,
      answer: model.answer,
      created_at: model.created_at,
      updated_at: model.updated_at,
      created_by: model.created_by,
      updated_by: model.updated_by,
    };
  return {};
}
