import { Request, Response } from 'express';
import { SubjectService } from './subject.service';
import Subject from '@src/common/entity/subject.entity';
import { errorHandler, successHandler } from '@src/common/services/response.service';
import { IUpdateSubject } from './subject.model';
import { serializeSubject } from './subject.serialize';

export class SubjectController {
  private subjectService: SubjectService = new SubjectService(Subject);

  public createSubject = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        class: req.body.class,
      };
      const data = {
        ...req.body,
        teacher: (<any>req).authorizedUser._id,
      };
      const newUser = await this.subjectService.create(data, filter);
      successHandler(req, res, newUser, 'Create New Subject', 201);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public getAllSubject = async (req: Request, res: Response) => {
    try {
      const result = await this.subjectService.getAll();
      const serializeData = result.map((subject: any) => serializeSubject(subject));
      successHandler(req, res, serializeData, 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public updateSubject = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateSubject = req.body;
      const result = await this.subjectService.update(data, filter);
      successHandler(req, res, result, 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
