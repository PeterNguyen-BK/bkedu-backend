import { Model } from 'mongoose';
import { ISubject } from '@src/common/entity/subject.entity';
import { BaseRepository } from '@src/common/repository/base.repository';

export class SubjectService extends BaseRepository<ISubject> {
  constructor(public readonly subjectRepository: Model<ISubject>) {
    super(subjectRepository);
  }

  override async getAll(filter: object = {}): Promise<ISubject[] | object[]> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      };
      const allItem = await this.subjectRepository
        .find(finalFilter)
        .populate('teacher', '_id name phone_number')
        .populate('class');
      return allItem;
    } catch (error) {
      throw error;
    }
  }
}
