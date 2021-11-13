import { Schema, model } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';

export interface IQuiz extends IBase {
  time: string;
  title: string;
  questionId: [string];
}

const quizSchema = new Schema(
  schemaBase({
    time: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
  }),
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IQuiz>(schemaName.quizSchemaName, quizSchema);
