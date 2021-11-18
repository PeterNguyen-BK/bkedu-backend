import { IClass } from '@src/common/entity/class.entity';
import { Status } from '@src/utils/constants';

export interface ICreateStudent {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  class: string;
}

export interface IUpdateStudent {
  name: string;
  phone_number: string;
}

export interface IStudentResponse {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  status: Status;
  is_first_login: boolean;
  class: IClass;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
