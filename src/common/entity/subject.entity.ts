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

export interface ISubject extends IBase {
  name: string;
  teacher: string;
  class: string;
  exercises: [IExercise];
  files: [IFile];
}

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
      type: string,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    class: {
      type: string,
      ref: 'Class',
    },
    exercises: {
      type: [exerciseSchema],
    },
    files: {
      type: [fileSchema],
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default model<ISubject>(schemaName.subjectSchemaName, subjectSchema);
