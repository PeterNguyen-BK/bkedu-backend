import { Model } from 'mongoose';
import { BaseRepository } from '@src/common/repository/base.repository';
import { ITeacher } from '@src/common/entity/teacher.entity';

export class TeacherService extends BaseRepository<ITeacher> {
  constructor(public readonly teacherRepository: Model<ITeacher>) {
    super(teacherRepository);
  }
}
