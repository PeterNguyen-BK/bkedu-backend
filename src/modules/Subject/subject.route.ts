import { Application } from 'express';
import { isAuthen } from '@src/middlewares/authen.middleware';
import { isAuthor } from '@src/middlewares/author.middleware';
import { UserRole } from '@src/utils/constants';
import { SubjectController } from './subject.controller';
import { upload } from '@src/middlewares/upload.middleware';
import { commonValidateBody } from '@src/middlewares/validate.middleware';
import { replySchema } from './subject.DTO';

export class SubjectRoute {
  private subjectController: SubjectController = new SubjectController();

  public route(app: Application) {
    app
      .route('/v1/subjects')
      .get(isAuthen, this.subjectController.getAllSubject)
      .post(isAuthen, isAuthor(UserRole.teacher), this.subjectController.createSubject);

    app.route('/v1/subjects/:id').all(isAuthen, isAuthor(UserRole.teacher)).put(this.subjectController.updateSubject);

    app
      .route('/v1/subjects/:id/upload')
      .put(isAuthen, isAuthor(UserRole.teacher), upload().array('files'), this.subjectController.uploadFile);

    app.route('/v1/subjects/:id/posts').put(isAuthen, isAuthor(UserRole.teacher), this.subjectController.addPost);

    app
      .route('/v1/subjects/:id/posts/:postId/reply')
      .put(
        isAuthen,
        isAuthor(UserRole.teacher, UserRole.student),
        commonValidateBody(replySchema),
        this.subjectController.replyToPost
      );

    app.route('/v1/subjects/:id/exercises').put(this.subjectController.addExercise);

    app
      .route('/v1/subjects/:id/exercises/:exerciseId')
      .put(isAuthen, isAuthor(UserRole.teacher), upload().array('files'), this.subjectController.updateExercise);

    app
      .route('/v1/subjects/:id/exercises/:exerciseId/submit')
      .put(isAuthen, isAuthor(UserRole.student), upload().array('files'), this.subjectController.submit);
  }
}
