import { Model } from 'mongoose';
import { BaseRepository } from '@src/common/repository/base.repository';
import { IStudent } from '@src/common/entity/student.entity';

export class StudentService extends BaseRepository<IStudent> {
  constructor(public readonly studentRepository: Model<IStudent>) {
    super(studentRepository);
  }
}
