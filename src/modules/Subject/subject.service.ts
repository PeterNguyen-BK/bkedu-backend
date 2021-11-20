import mongoose, { Model } from 'mongoose';
import * as fs from 'fs';
import { IPost, ISubject } from '@src/common/entity/subject.entity';
import { BaseRepository } from '@src/common/repository/base.repository';
import { AppError } from '@src/utils/error';
import { ErrorMessage, ErrorResponseCode } from '@src/utils/constants';
import { uploadFile } from '@src/utils/cloudinary';

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
        .populate('class')
        .populate('posts.created_by', '_id email name phone_number role')
        .populate('posts.updated_by', '_id email name phone_number role')
        .populate('posts.replies.created_by', '_id email name phone_number role')
        .populate('posts.replies.updated_by', '_id email name phone_number role')
        .populate('files.created_by', '_id email name phone_number role')
        .populate('files.updated_by', '_id email name phone_number role');
      return allItem;
    } catch (error) {
      throw error;
    }
  }

  override async getOne(filter: object = {}): Promise<ISubject | object> {
    try {
      const finalFilter: object = {
        ...filter,
        is_delete: false,
      };
      const subject = await this.subjectRepository
        .findOne(finalFilter)
        .populate('teacher', '_id name phone_number')
        .populate('class')
        .populate('posts.created_by', '_id email name phone_number role')
        .populate('posts.updated_by', '_id email name phone_number role')
        .populate('posts.replies.created_by', '_id email name phone_number role')
        .populate('posts.replies.updated_by', '_id email name phone_number role')
        .populate('files.created_by', '_id email name phone_number role')
        .populate('files.updated_by', '_id email name phone_number role');
      if (!subject) throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
      return subject;
    } catch (error) {
      throw error;
    }
  }

  async addPost(data: any, filter: object = {}): Promise<any> {
    try {
      const finalFilter: object = {
        ...filter,
        is_deleted: false,
      };
      console.log(data);
      const updatedItem = await this.subjectRepository.findOneAndUpdate(
        finalFilter,
        { $push: { posts: data } },
        { new: true }
      );
      if (!updatedItem) throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }

  async replyToPost(data: any, filter: any = {}): Promise<any> {
    try {
      const finalFilter: object = {
        _id: filter._id,
        is_deleted: false,
      };
      const subject = await this.subjectRepository.findOne(finalFilter);
      if (!subject) throw new AppError(ErrorMessage.NOT_FOUND, ErrorResponseCode.NOT_FOUND);
      subject.posts = <[IPost]>subject.posts.map((post: IPost) => {
        if (post._id == filter.postId) {
          post.replies.push(data);
        }
        return post;
      });
      await subject.save();
      return subject;
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(files: any, filter: any = {}): Promise<any> {
    try {
      const finalFilter: object = {
        _id: filter._id,
        is_deleted: false,
      };
      const data = await Promise.all(
        files.map(async (file: any) => {
          const fileUploaded = await uploadFile(file, 'Subject');
          fs.unlinkSync(file.path);
          return {
            original_name: file.originalname,
            public_id: (<any>fileUploaded).public_id,
            url: (<any>fileUploaded).secure_url,
            created_by: file.created_by,
            updated_by: file.updated_by,
          };
        })
      );
      const updatedItem = await this.subjectRepository.findOneAndUpdate(
        finalFilter,
        { $push: { files: { $each: data } } },
        { new: true }
      );
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }
}
