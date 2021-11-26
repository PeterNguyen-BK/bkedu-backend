import { Request, Response } from 'express';
import { ClassService } from './class.service';
import Class, { IClass } from '@src/common/entity/class.entity';
import { errorHandler, successHandler } from '@src/common/services/response.service';
import { IUpdateClass } from './class.model';
import { serializeClass } from './class.serializer';

export class ClassController {
  private classService: ClassService = new ClassService(Class);

  public getAllClasses = async (req: Request, res: Response) => {
    try {
      const result = await this.classService.getAll();
      const serializeData = result.map((temp: any) => serializeClass(temp));
      successHandler(req, res, serializeData, 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public getClass = async (req: Request, res: Response) => {
    try {
      const result = await this.classService.getOne();
      successHandler(req, res, serializeClass(result), 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public createClass = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        class: req.body.name,
      };
      const data = {
        ...req.body,
        form_teacher: (<any>req).authorizedUser._id,
      };
      const newClass = await this.classService.create(data, filter);
      successHandler(req, res, newClass, 'Create New Class', 201);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public updateClass = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateClass = req.body;
      const result = await this.classService.update(data, filter);
      successHandler(req, res, result, 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public deleteClass = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateClass = req.body;
      const result = await this.classService.update(data, filter);
      successHandler(req, res, result, 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
