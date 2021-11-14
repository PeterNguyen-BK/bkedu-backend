import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import User from '@src/common/entity/user.entity';
import { ILoginUser } from './auth.model';
import { successHandler, errorHandler } from '@src/common/services/response.service';

export class AuthController {
  private authService: AuthService = new AuthService(User);

  public async login(req: Request, res: Response) {
    try {
      const data: ILoginUser = req.body;
      const tokens = await this.authService.login(data);
      successHandler(req, res, tokens, 'Create New User', 200);
    } catch (error) {
      errorHandler(req, res, error, 400);
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const filter: object = {
        email: req.body.email,
      };
      const newUser = await this.authService.create(req.body, filter);
      successHandler(req, res, newUser, 'Create New User', 204);
    } catch (error) {
      errorHandler(req, res, error, 400);
    }
  }
}
