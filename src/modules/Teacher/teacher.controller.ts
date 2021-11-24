import { Request, Response } from 'express';
import { TeacherService } from './teacher.service';
import Teacher, { ITeacher } from '@src/common/entity/teacher.entity';
import { errorHandler, successHandler } from '@src/common/services/response.service';
import { IUpdateTeacher } from './teacher.model';
import { serializeTeacher } from './teacher.serializer';

export class TeacherController {
  private teacherService: TeacherService = new TeacherService(Teacher);

  public getAllTeachers = async (req: Request, res: Response) => {
    try {
      const result = await this.teacherService.getAll();
      const serializeData = result.map((teacher: any) => serializeTeacher(teacher));
      successHandler(req, res, serializeData, 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public getTeacher = async (req: Request, res: Response) => {
    try {
      const result = await this.teacherService.getOne();
      successHandler(req, res, serializeTeacher(result), 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public createTeacher = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        email: req.body.email,
      };
      const newUser = await this.teacherService.create(req.body, filter);
      successHandler(req, res, serializeTeacher(newUser), 'Create New Teacher', 201);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public updateTeacher = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateTeacher = req.body;
      const result = await this.teacherService.update(data, filter);
      successHandler(req, res, serializeTeacher(result), 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public deleteTeacher = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateTeacher = req.body;
      const result = await this.teacherService.update(data, filter);
      successHandler(req, res, { is_delete: true }, 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
