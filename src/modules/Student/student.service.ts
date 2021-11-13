import { Model } from 'mongoose';
import { IUser } from '@src/common/entity/user.entity';
import { BaseRepository } from '@src/common/repository/base.repository';

export class UserService extends BaseRepository<IUser> {
  constructor(public readonly userRepository: Model<IUser>) {
    super(userRepository);
  }
}
