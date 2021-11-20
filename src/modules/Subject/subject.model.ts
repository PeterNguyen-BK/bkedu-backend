import { IExercise, IFile, IPost } from '@src/common/entity/subject.entity';

export interface IUpdateSubject {
  name: string;
  teacher: string;
  class: string;
  posts: [IPost];
  exercises: [IExercise];
  files: [IFile];
}

export interface ISubjectResponse {
  _id: string;
  name: string;
  teacher: string;
  class: string;
  posts: [IPost];
  exercises: [IExercise];
  files: [IFile];
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
