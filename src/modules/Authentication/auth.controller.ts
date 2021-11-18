import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import User from '@src/common/entity/user.entity';
import { ILoginUser } from './auth.model';
import { successHandler, errorHandler } from '@src/common/services/response.service';
import { AppError } from '@src/utils/error';
import { ErrorMessage, ErrorResponseCode } from '@src/utils/constants';

export class AuthController {
  private authService: AuthService = new AuthService(User);

  public login = async (req: Request, res: Response) => {
    try {
      const data: ILoginUser = req.body;
      const tokens = await this.authService.login(data);
      successHandler(req, res, tokens, 'Login Successfully', 200);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  public refreshToken = async (req: Request, res: Response) => {
    try {
      const { refresh_token } = req.body;
      const accessToken = await this.authService.refreshToken(refresh_token);
      if (accessToken) successHandler(req, res, { access_token: accessToken }, 'Login Successfully', 200);
      else throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

  // public async forgotPassword(req: Request, res: Response) {
  //   try {

  //   } catch(error) {
  //     errorHandler(req, res, error, 500);
  //   }
  // }
}
