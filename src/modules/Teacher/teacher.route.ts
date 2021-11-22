import { Application } from 'express';
import { commonValidateBody } from '@src/middlewares/validate.middleware';
import { TeacherController } from './teacher.controller';
import { createTeacherSchema, updateTeacherSchema } from './teacher.DTO';
import { isAuthen } from '@src/middlewares/authen.middleware';
import { isAuthor } from '@src/middlewares/author.middleware';
import { UserRole } from '@src/utils/constants';

export class TeacherRoute {
  private teacherController: TeacherController = new TeacherController();

  public route(app: Application) {
    app
      .route('/v1/teachers')
      .get(isAuthen, isAuthor(UserRole.teacher, UserRole.student), this.teacherController.getAllTeachers)
      .post(commonValidateBody(createTeacherSchema), this.teacherController.createTeacher);
    app
      .route('/v1/teachers/:id')
      .all(isAuthen, isAuthor(UserRole.teacher))
      .get(this.teacherController.getTeacher)
      .put(commonValidateBody(updateTeacherSchema), this.teacherController.updateTeacher)
      .delete(this.teacherController.deleteTeacher);
  }
}
