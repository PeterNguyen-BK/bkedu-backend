import { Schema, model, Document } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';

export interface IQuiz extends IBase {
  time: string;
  title: string;
  question_id: [string];
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
    question_id: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'Question',
    },
  }),
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IQuiz>(schemaName.quizSchemaName, quizSchema);
