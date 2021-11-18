import { Model } from 'mongoose';
import { BaseRepository } from '@src/common/repository/base.repository';
import { IStudent } from '@src/common/entity/student.entity';
import Class from '@src/common/entity/class.entity';
import { AppError } from '@src/utils/error';
import { ErrorMessage, ErrorResponseCode } from '@src/utils/constants';

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

  override async update(data: IStudent | any, filter: object = {}): Promise<IStudent | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      };
      const updatedItem = await this.studentRepository.findOneAndUpdate(finalFilter, data, { new: true });
      if (!updatedItem) throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
      if (data && data.class) await Class.updateOne({ _id: data.class }, { $inc: { num_of_students: 1 } });
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }

  override async create(data: IStudent | any, filter: object = {}): Promise<IStudent | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      };
      const check = await this.studentRepository.find(finalFilter);
      if (check.length > 0) throw new AppError('Type has been existed. Please enter type again', 400);
      const newItem = new this.studentRepository(data);
      if (newItem && newItem.class) await Class.updateOne({ _id: data.class }, { $inc: { num_of_students: 1 } });
      await newItem.save();
      return newItem;
    } catch (error) {
      throw error;
    }
  }
}
