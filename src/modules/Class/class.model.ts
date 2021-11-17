import { IClass } from '@src/common/entity/class.entity';
import { Status } from '@src/utils/constants';

export interface ICreateClass {
  name: string;
  num_of_students: number;
  form_teacher: string;
}

export interface IUpdateClass {
  name: string;
  num_of_students: number;
  form_teacher: string;
}

export interface IClassResponse {
  _id: string;
  name: string;
  num_of_students: number;
  form_teacher: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
