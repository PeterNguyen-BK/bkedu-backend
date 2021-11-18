import { string } from 'joi';
import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';

export interface IFile {
  url: string;
  upload_by: string;
  upload_at: Date;
}

export interface IExercise extends IBase {
  title: string;
  description?: string;
  deadline: Date;
  files?: [IFile];
  submit_file: [IFile];
}

export interface IReply extends IBase {
  content: string;
}

export interface IPost extends IBase {
  content: string;
  reply: [IReply];
}

export interface ISubject extends IBase {
  name: string;
  teacher: string;
  class: string;
  post: [IPost];
  exercises: [IExercise];
  files: [IFile];
}

const replySchema = new Schema(
  schemaBase({
    content: {
      type: String,
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const postSchema = new Schema(
  schemaBase({
    content: {
      type: String,
    },
    reply: {
      type: [replySchema],
      default: [],
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const fileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  upload_by: {
    type: Schema.Types.ObjectId,
    refPath: 'byUser',
  },
  byUser: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher'],
  },
  upload_at: {
    type: Date,
  },
});

const exerciseSchema = new Schema<IExercise>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  files: {
    type: [fileSchema],
    required: true,
  },
  submit_file: {
    type: [fileSchema],
    required: true,
  },
});

const subjectSchema = new Schema(
  schemaBase({
    name: {
      type: String,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
    post: {
      type: [postSchema],
      default: [],
    },
    exercises: {
      type: [exerciseSchema],
      default: [],
    },
    files: {
      type: [fileSchema],
      default: [],
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default model<ISubject>(schemaName.subjectSchemaName, subjectSchema);
