import { Schema, model } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';
import Quiz from './quiz.entity';
import { IQuest, IOption, IAnswer } from './question.entity';
import { AppError } from '@src/utils/error';
import { ErrorMessage, ErrorResponseCode, QuestType } from '@src/utils/constants';

export interface IResult extends IBase {
  testId: string;
  answers: [question_id: string, selected_option: string];
  point: number;
  executed_time: string;
}

const resultSchema = new Schema(
  schemaBase({
    test_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Quiz',
    },
    answers: Schema.Types.Mixed,
    point: {
      type: Number,
    },
    executed_time: {
      type: String,
      required: true,
    },
  })
);

resultSchema.pre('save', async function () {
  const quiz = await Quiz.findOne({ _id: this.test_id, is_delete: false }).populate('question_id');
  if (!quiz) throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
  const questions = <IQuest[]>(<unknown>quiz.question_id);
  let questionInQuiz, check;
  this.answers.map((answer: any) => {
    questionInQuiz = questions.find((question: IQuest) => question._id === answer.question_id);
    if (!questionInQuiz) throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
    if (questionInQuiz.type === QuestType.ESSAY) {
      answer.selected_option = answer.selected_option.trim();
      answer.selected_option = answer.selected_option.replace(/\s\s+/g, ' ');
      if (answer.selected_option === (<IAnswer>questionInQuiz.answer).correct_answer) this.point++;
    } else {
      check = (<IOption[]>(<unknown>questionInQuiz.answer)).filter(
        (option: IOption) => option._id === answer.selected_option
      );
      if (check.length > 0) this.point++;
    }
  });
});

export default model<IResult>(schemaName.resultSchemaName, resultSchema);
