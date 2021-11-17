import { Schema, model } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { QuestType } from '../../utils/constants';
import { schemaName } from './schemaName';

export interface IOption {
  _id: string;
  option: string;
  is_correct: boolean;
  is_selected?: boolean;
}

export interface IAnswer {
  correct_answer: string;
  option: string;
}

export interface IQuest extends IBase {
  rating: number;
  type: QuestType;
  question: string;
  answer: [IOption] | IAnswer;
}

const questionSchema = new Schema(
  schemaBase({
    rating: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: QuestType,
    },
    question: {
      type: String,
      required: true,
    },
    answer: Schema.Types.Mixed,
  }),
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IQuest>(schemaName.questionSchemaName, questionSchema);
