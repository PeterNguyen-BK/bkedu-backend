import { Application } from 'express';
import { commonValidateBody } from '@src/middlewares/validate.middleware';
import { TeacherController } from './teacher.controller';
import { createTeacherSchema, updateTeacherSchema } from './teacher.DTO';

export class TeacherRoute {
  private teacherController: TeacherController = new TeacherController();

  public route(app: Application) {
    app
      .route('/v1/teachers')
      .get(this.teacherController.getAllTeachers)
      .post(commonValidateBody(createTeacherSchema), this.teacherController.createTeacher);
    app
      .route('/v1/teachers/:id')
      .get(this.teacherController.getTeacher)
      .put(commonValidateBody(updateTeacherSchema), this.teacherController.updateTeacher)
      .delete(this.teacherController.deleteTeacher);
  }
}
