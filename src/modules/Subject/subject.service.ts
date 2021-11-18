import { Model } from 'mongoose';
import { ISubject } from '@src/common/entity/subject.entity';
import { BaseRepository } from '@src/common/repository/base.repository';

export class SubjectService extends BaseRepository<ISubject> {
  constructor(public readonly subjectRepository: Model<ISubject>) {
    super(subjectRepository);
  }
}
