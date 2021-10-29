import { UserService } from "./user.service";
import User, { IUser } from '@src/common/entity/user.entity';
import { Request, Response } from 'express';

export class UserController {
  private userService: UserService = new UserService(User);

  public async getAllUsers(req: Request, res: Response) {
    const result = await this.userService.getAll();
  }
}