import { Application } from 'express';
import { AuthRoute } from './Authentication/auth.route';
import { UserRoute } from './Student/student.route';

export class CombineRoute {
  private authRoute: AuthRoute = new AuthRoute();
  private userRoute: UserRoute = new UserRoute();

  public start(app: Application) {
    this.authRoute.route(app);
    this.userRoute.route(app);
  }
}
