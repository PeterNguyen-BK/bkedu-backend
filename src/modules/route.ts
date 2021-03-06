import { Application } from 'express';
import { AuthRoute } from './Authentication/auth.route';
import { ClassRoute } from './Class/class.route';
import { StudentRoute } from './Student/student.route';
import { SubjectRoute } from './Subject/subject.route';
import { TeacherRoute } from './Teacher/teacher.route';

export class CombineRoute {
  private authRoute: AuthRoute = new AuthRoute();

  private studentRoute: StudentRoute = new StudentRoute();

  private teacherRoute: TeacherRoute = new TeacherRoute();

  private classRoute: ClassRoute = new ClassRoute();

  private subjectRoute: SubjectRoute = new SubjectRoute();

  public start(app: Application) {
    this.authRoute.route(app);
    this.studentRoute.route(app);
    this.teacherRoute.route(app);
    this.classRoute.route(app);
    this.subjectRoute.route(app);
  }
}
