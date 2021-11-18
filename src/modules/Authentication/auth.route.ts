import { Application } from 'express';
import { AuthController } from './auth.controller';
import { commonValidateBody } from '@src/middlewares/validate.middleware';
import { loginSchema } from './auth.DTO';

export class AuthRoute {
  private authController: AuthController = new AuthController();

  public route(app: Application) {
    app.route('/v1/auth').post(commonValidateBody(loginSchema), this.authController.login);
    app.route('/v1/auth/refresh').post(this.authController.refreshToken);
  }
}
