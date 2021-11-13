import { Application } from 'express';
import { AuthController } from './auth.controller';

export class AuthRoute {
  private authController: AuthController = new AuthController();

  public route(app: Application) {
    app.route('/v1/auth').post(this.authController.register);

    app.route('/v1/auth/login').post(this.authController.login);
  }
}
