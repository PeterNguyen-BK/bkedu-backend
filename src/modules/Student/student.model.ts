import { IClass } from '@src/common/entity/class.entity';
import { Status } from '@src/utils/constants';

export interface ICreateStudent {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  birthday: Date;
  password: string;
  phone_number: string;
  class: string;
}

export interface IUpdateStudent {
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  birthday: Date;
  phone_number: string;
}

export interface IStudentResponse {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  birthday: Date;
  phone_number: string;
  status: Status;
  is_first_login: boolean;
  class: IClass;
}
