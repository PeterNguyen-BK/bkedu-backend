import { Application } from 'express';
import { QuestionController } from './question.controller';
import { createQuestionSchema } from './question.DTO';
import { commonValidateBody } from '@src/middlewares/validate.middleware';

export class QuestionRoute {
  private questionController: QuestionController = new QuestionController();

  public route(app: Application) {
    app
      .route('/v1/questions')
      .get(this.questionController.getAllQuestion)
      .post(commonValidateBody(createQuestionSchema), this.questionController.createQuestion);
  }
}
