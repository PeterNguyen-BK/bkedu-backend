import { Model } from 'mongoose';
import { BaseRepository } from '@src/common/repository/base.repository';
import { IClass } from '@src/common/entity/class.entity';

export class ClassService extends BaseRepository<IClass> {
  constructor(public readonly classRepository: Model<IClass>) {
    super(classRepository);
  }
}
