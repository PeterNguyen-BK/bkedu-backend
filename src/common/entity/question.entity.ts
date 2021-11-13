import { Schema, model } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { QuestType } from '../../utils/constants';
import { schemaName } from './schemaName';

export interface IOption {
  _id: string;
  answer: string;
  isCorrect: boolean;
  isSelected?: boolean;
}

export interface IQuest extends IBase {
  rating: number;
  type: QuestType;
  quiz: string;
  options: [IOption] | string;
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
    options: Schema.Types.Mixed,
  }),
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IQuest>(schemaName.questionSchemaName, questionSchema);
