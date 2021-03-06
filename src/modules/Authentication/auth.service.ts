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
        const { ...payload } = <IUser>user;
        const { password, refresh_token, ...newPayload } = (<any>payload)._doc;
        const accessToken = jwt.sign(newPayload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' });
        const refreshToken = jwt.sign(newPayload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '7d' });
        const dataUpdate = newPayload.is_first_login
          ? { refresh_token: refreshToken }
          : { is_first_login: true, refresh_token: refreshToken };
        await this.update(dataUpdate, { _id: (<IUser>user)._id });
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
      const { ...payload } = <IUser>user;
      const { password, refresh_token, ...newPayload } = (<any>payload)._doc;
      try {
        await (<any>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`));
        const accessToken = jwt.sign(newPayload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' });
        return accessToken;
      } catch (err) {
        throw err;
      }
    } else return null;
  }
}
