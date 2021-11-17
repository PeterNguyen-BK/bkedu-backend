import { Request, Response } from 'express';
import { QuestionService } from './question.service';
import Question, { IQuest } from '@src/common/entity/question.entity';
import { errorHandler, successHandler } from '@src/common/services/response.service';
import { serializeQuestion } from './question.serialize';

export class QuestionController {
  private questionService: QuestionService = new QuestionService(Question);

  public getAllQuestion = async (req: Request, res: Response) => {
    try {
      const result = await this.questionService.getAll();
      const serializeData = result.map((temp: any) => serializeQuestion(temp));
      successHandler(req, res, serializeData, 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public createQuestion = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        question: req.body.question,
      };
      const newUser = await this.questionService.create(req.body, filter);
      successHandler(req, res, newUser, 'Create New Question', 201);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
