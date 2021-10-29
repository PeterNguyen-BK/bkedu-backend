import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import User from '@src/common/entity/user.entity';
import { ILoginUser } from "./auth.model";

export class AuthController {
  private authService: AuthService = new AuthService(User);

  public async login(req: Request, res: Response) {
    const data: ILoginUser = req.body;
    const tokens = await this.authService.login(data);
    
  }
}