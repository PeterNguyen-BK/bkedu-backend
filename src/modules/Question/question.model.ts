import { IAnswer, IOption } from '@src/common/entity/question.entity';
import { QuestType } from '@src/utils/constants';

export interface IQuestionResponse {
  _id: string;
  rating: number;
  type: QuestType;
  question: string;
  answer: [IOption] | IAnswer;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
