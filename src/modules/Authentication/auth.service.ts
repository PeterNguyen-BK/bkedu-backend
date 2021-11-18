import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IUser } from '@src/common/entity/user.entity';
import { BaseRepository } from '@src/common/repository/base.repository';
import { ILoginUser } from './auth.model';

export class AuthService extends BaseRepository<IUser> {
  constructor(public readonly userRepository: Model<IUser>) {
    super(userRepository);
  }

  async login(data: ILoginUser): Promise<object> {
    try {
      const filter: object = {
        email: data.email,
      };
      const user = await this.getOne(filter);
      const check = await bcrypt.compare(data.password, (<IUser>user).password);
      if (check) {
        const { password, ...payload } = <IUser>user;
        const accessToken = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '7d' });
        await this.update({ is_first_login: true, refresh_token: refreshToken }, { _id: (<IUser>user)._id });
        return {
          access_token: accessToken,
          refresh_token: refreshToken,
        };
      }
      throw new Error('Wrong password');
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: any): Promise<any> {
    const user = await this.userRepository.findOne({ refresh_token: refreshToken });
    if (user) {
      const { password, ...payload } = <IUser>user;
      try {
        await (<any>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`));
        const accessToken = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' });
        return accessToken;
      } catch (err) {
        throw err;
      }
    } else return null;
  }
}
