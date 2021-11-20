import { Application } from 'express';
import mongoose from 'mongoose';
import { StudentController } from './student.controller';
import { createStudentSchema, updateStudentSchema } from './student.DTO';
import { commonValidateBody } from '@src/middlewares/validate.middleware';
import { isAuthen } from '@src/middlewares/authen.middleware';
import { isAuthor } from '@src/middlewares/author.middleware';
import { UserRole } from '@src/utils/constants';

export class StudentRoute {
  private studentController: StudentController = new StudentController();

  public route(app: Application) {
    app
      .route('/v1/students')
      .get(isAuthen, isAuthor(UserRole.student, UserRole.teacher), this.studentController.getAllStudents)
      .post(commonValidateBody(createStudentSchema), this.studentController.createStudent);
    app
      .route('/v1/students/:id')
      .all(isAuthen, isAuthor(UserRole.student, UserRole.teacher))
      .get(this.studentController.getStudent)
      .put(commonValidateBody(updateStudentSchema), this.studentController.updateStudent)
      .delete(this.studentController.deleteStudent);
  }
}
