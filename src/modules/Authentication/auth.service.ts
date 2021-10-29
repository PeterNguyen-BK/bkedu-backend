import { Model } from 'mongoose';
import { IUser } from '@src/common/entity/user.entity';
import { BaseRepository } from '@src/common/repository/base.repository';
import { ILoginUser, IRegisterUser } from './auth.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService extends BaseRepository<IUser> {
  constructor(public readonly userRepository: Model<IUser>) {
    super(userRepository);
  }

  async register(data: IRegisterUser): Promise<IUser | object> {
    try {
      const filter: object = {
        email: data.email,
      }
      const newUser = await this.create(data, filter);
      return newUser;
    } catch(error: any) {
      throw new Error(error);
    }
  }

  async login(data: ILoginUser): Promise<object> {
    try {
      const filter: object = {
        email: data.email,
      }
      const user = await this.getOne(filter);
      const check = await bcrypt.compare(data.password, (<IUser>user).password);
      if (check) {
        const { password, ...payload } = <IUser>user;
        const access_token = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '1h'});
        const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {expiresIn: '7d'});
        return {
          access_token: access_token,
          refresh_token: refresh_token,
        };
      } else throw new Error('Wrong password');
    } catch(error: any) {
      throw new Error(error);
    }
  }
}