import { Request, Response } from 'express';
import { StudentService } from './student.service';
import Student, { IStudent } from '@src/common/entity/student.entity';
import { errorHandler, successHandler } from '@src/common/services/response.service';
import { IUpdateStudent } from './student.model';
import { serializeStudent } from './student.serializer';

export class StudentController {
  private studentService: StudentService = new StudentService(Student);

  public getAllStudents = async (req: Request, res: Response) => {
    try {
      const filter: any = req.query.classId ? { class: req.query.classId } : {};
      if (req.query.search) filter.$text = { $search: `"${req.query.search}"` };
      const result = await this.studentService.getAll(filter);
      const serializeData = result.map((student: any) => serializeStudent(student));
      successHandler(req, res, serializeData, 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public getStudent = async (req: Request, res: Response) => {
    try {
      const result = await this.studentService.getOne();
      successHandler(req, res, serializeStudent(result), 'Get Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };

  public createStudent = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        email: req.body.email,
      };
      const newUser = await this.studentService.create(req.body, filter);
      successHandler(req, res, serializeStudent(newUser), 'Create New Student', 201);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public updateStudent = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateStudent = req.body;
      const result = await this.studentService.update(data, filter);
      successHandler(req, res, serializeStudent(result), 'Update Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public deleteStudent = async (req: Request, res: Response) => {
    try {
      const filter: object = {
        _id: req.params.id,
      };
      const data: IUpdateStudent = req.body;
      const result = await this.studentService.update(data, filter);
      successHandler(req, res, { is_delete: true }, 'Delete Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
