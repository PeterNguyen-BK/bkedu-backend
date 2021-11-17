import { IClass } from '@src/common/entity/class.entity';
import { Status } from '@src/utils/constants';

export interface ICreateTeacher {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  birthday: Date;
  password: string;
  phone_number: string;
}

export interface IUpdateTeacher {
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  birthday: Date;
  phone_number: string;
}

export interface ITeacherResponse {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  birthday: Date;
  phone_number: string;
  status: Status;
  is_first_login: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
