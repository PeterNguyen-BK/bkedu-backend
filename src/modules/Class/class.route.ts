import { Application } from 'express';
import { ClassController } from './class.controller';
import { createClassSchema, updateClassSchema } from './class.DTO';
import { commonValidateBody, commonValidateQuery } from '@src/middlewares/validate.middleware';
import { isAuthen } from '@src/middlewares/authen.middleware';
import { isAuthor } from '@src/middlewares/author.middleware';
import { UserRole } from '@src/utils/constants';

export class ClassRoute {
  private classController: ClassController = new ClassController();

  public route(app: Application) {
    app
      .route('/v1/classes')
      .all(isAuthen, isAuthor(UserRole.teacher, UserRole.student))
      .get(this.classController.getAllClasses)
      .post(commonValidateBody(createClassSchema), this.classController.createClass);
    app
      .route('/v1/classes/:id')
      .get(this.classController.getClass)
      .put(commonValidateBody(updateClassSchema), this.classController.updateClass)
      .delete(this.classController.deleteClass);
  }
}
