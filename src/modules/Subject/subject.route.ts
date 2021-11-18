import { Application } from 'express';
import { isAuthen } from '@src/middlewares/authen.middleware';
import { isAuthor } from '@src/middlewares/author.middleware';
import { UserRole } from '@src/utils/constants';
import { SubjectController } from './subject.controller';

export class SubjectRoute {
  private subjectController: SubjectController = new SubjectController();

  public route(app: Application) {
    app
      .route('/v1/subjects')
      .all(isAuthen, isAuthor(UserRole.teacher))
      .get(this.subjectController.getAllSubject)
      .post(this.subjectController.createSubject);

    app.route('/v1/subjects/:id').all(isAuthen, isAuthor(UserRole.teacher)).put(this.subjectController.updateSubject);
  }
}
