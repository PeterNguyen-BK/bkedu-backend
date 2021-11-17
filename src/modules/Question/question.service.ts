import { Model } from 'mongoose';
import { IQuest } from '@src/common/entity/question.entity';
import { BaseRepository } from '@src/common/repository/base.repository';

export class QuestionService extends BaseRepository<IQuest> {
  constructor(public readonly questRepository: Model<IQuest>) {
    super(questRepository);
  }
}
