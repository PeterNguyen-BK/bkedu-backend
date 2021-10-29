import { Model } from 'mongoose';

export abstract class BaseRepository<T> {
  private entity: Model<T>;

  constructor(entity: Model<T>) {
    this.entity = entity;
  }

  public async create(data: T | any, filter: object = {}): Promise<T | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      };
      const check = await this.entity.find(finalFilter);
      if (check.length > 0) throw new Error('Type has been existed. Please enter type again');
      const newItem = new this.entity(data);
      await newItem.save();
      return newItem;
    } catch(error: any) {
      throw new Error(error);
    }
  }

  public async getAll(filter: object = {}): Promise<T[] | object[]> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      }
      const allItem = await this.entity.find(finalFilter);
      return allItem;
    } catch(error: any) {
      throw new Error(error);
    }
  }

  public async getOne(filter: object = {}): Promise<T | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      }
      const item = await this.entity.findOne(finalFilter);
      if (!item) throw new Error('Not Exist');
      return item;
    } catch(error: any) {
      throw new Error(error);
    }
  }

  public async update(data: T | any, filter: object = {}): Promise<T | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      }
      const updatedItem = await this.entity.findOneAndUpdate(finalFilter, data, { new: true });
      if (!updatedItem) throw new Error('Not Exist');
      return updatedItem;
    } catch(error: any) {
      throw new Error(error);
    }
  }

  public async delete(filter: object = {}): Promise<T | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      }
      const data: object = {
        is_deleted: true,
      }
      const deletedItem = await this.entity.findOneAndUpdate(finalFilter, data, { new: true });
      if (!deletedItem) throw new Error('Not Exist');
      return deletedItem;
    } catch(error: any) {
      throw new Error(error);
    }
  }
}
