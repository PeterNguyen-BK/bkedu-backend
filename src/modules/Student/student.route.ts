import { Application } from 'express';
import mongoose from 'mongoose';
import { StudentController } from './student.controller';
import { createStudentSchema, updateStudentSchema } from './student.DTO';
import { commonValidateBody } from '@src/middlewares/validate.middleware';

export class StudentRoute {
  private studentController: StudentController = new StudentController();

  public route(app: Application) {
    app
      .route('/v1/students')
      .get(this.studentController.getAllStudents)
      .post(commonValidateBody(createStudentSchema), this.studentController.createStudent);
    app
      .route('/v1/students/:id')
      .get(this.studentController.getStudent)
      .put(commonValidateBody(updateStudentSchema), this.studentController.updateStudent)
      .delete(this.studentController.deleteStudent);
  }
}
