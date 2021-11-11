import { Request, Response } from 'express';
import { UserService } from './student.service';
import User, { IUser } from '@src/common/entity/user.entity';
import { errorHandler, successHandler } from '@src/common/services/response.service';

export class UserController {
  private userService: UserService = new UserService(User);

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getAll();
      successHandler(req, res, result, "Get Successfully", 200);
    } catch(error) {
      errorHandler(req, res, error, 500)
    }
  }

  public getUser = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getOne();
      successHandler(req, res, result, "Get Successfully", 200);
    } catch(error) {
      errorHandler(req, res, error, 500)
    }
  }
}
