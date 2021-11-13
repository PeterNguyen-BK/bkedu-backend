import { Schema, model } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';

export interface IResult extends IBase {
  testId: string;
  answer: [questionId: string, selectedOption: string];
  point: number;
}

const resultSchema = new Schema(
  schemaBase({
    testId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Quiz',
    },
    answer: Schema.Types.Mixed,
    point: {
      type: Number,
    },
  })
);

export default model<IResult>(schemaName.resultSchemaName, resultSchema);
