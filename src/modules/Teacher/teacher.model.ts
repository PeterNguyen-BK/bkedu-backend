import { Status } from '@src/utils/constants';

export interface ICreateTeacher {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface IUpdateTeacher {
  name: string;
  phone_number: string;
}

export interface ITeacherResponse {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  status: Status;
  is_first_login: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
