import { Model } from 'mongoose';
import { BaseRepository } from '@src/common/repository/base.repository';
import { IStudent } from '@src/common/entity/student.entity';

export class StudentService extends BaseRepository<IStudent> {
  constructor(public readonly studentRepository: Model<IStudent>) {
    super(studentRepository);
  }

  override async getAll(filter: object = {}): Promise<IStudent[] | object[]> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      };
      const allItem = await this.studentRepository.find(finalFilter).populate('class');
      return allItem;
    } catch (error) {
      throw error;
    }
  }
}
