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
      const filter: object = req.query ? { teacher: req.query.id } : {};
      const result = await this.subjectService.getAll(filter);
      const serializeData = result.map((subject: any) => serializeSubject(subject));
      successHandler(req, res, serializeData, 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public getOneSubject = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const result = await this.subjectService.getOne(filter);
      successHandler(req, res, serializeSubject(result), 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
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

  public addPost = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data = {
        ...req.body,
        created_by: (<any>req).authorizedUser._id,
        updated_by: (<any>req).authorizedUser._id,
      };

      const result = await this.subjectService.addPost(data, filter);
      successHandler(req, res, result, 'Add Post Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public replyToPost = async (req: Request, res: Response) => {
    try {
      const filter: any = {
        _id: req.params.id,
        postId: req.params.postId,
      };
      const data = {
        ...req.body,
        created_by: (<any>req).authorizedUser._id,
        updated_by: (<any>req).authorizedUser._id,
      };
      const result = await this.subjectService.replyToPost(data, filter);
      successHandler(req, res, result, 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public uploadFile = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      req.files = (<any[]>req.files).map((file: any) => {
        return {
          ...file,
          created_by: (<any>req).authorizedUser._id,
          updated_by: (<any>req).authorizedUser._id,
        };
      });
      const result = await this.subjectService.uploadFile(req.files, filter);
      successHandler(req, res, result, 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public addExercise = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const result = await this.subjectService.addExercise(req.body, filter);
      successHandler(req, res, result, 'Add Exercise Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public updateExercise = async (req: Request, res: Response) => {
    try {
      const filter: any = {
        _id: req.params.id,
        exerciseId: req.params.exerciseId,
      };
      req.files = (<any[]>req.files).map((file: any) => {
        return {
          ...file,
          created_by: (<any>req).authorizedUser._id,
          updated_by: (<any>req).authorizedUser._id,
        };
      });
      const data = {
        files: req.files,
        ...req.body,
      };
      const result = await this.subjectService.updateExercise(data, filter);
      successHandler(req, res, result, 'Update Exercise Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public submit = async (req: Request, res: Response) => {
    try {
      const filter: any = {
        _id: req.params.id,
        exerciseId: req.params.exerciseId,
        user: (<any>req).authorizedUser._id,
      };
      const result = await this.subjectService.submit(req.files, filter);
      successHandler(req, res, result, 'Update Exercise Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
