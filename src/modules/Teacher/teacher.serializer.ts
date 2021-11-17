import { ITeacherResponse } from './teacher.model';

export function serializeTeacher(model: any): ITeacherResponse | object {
  if (model) {
    return {
      _id: model._id,
      first_name: model.first_name,
      last_name: model.last_name,
      gender: model.gender,
      address: model.address,
      birthday: model.birthday,
      phone_number: model.phone_number,
      status: model.status,
      is_first_login: model.is_first_login,
      created_at: model.created_at,
      updated_at: model.updated_at,
      created_by: model.created_by,
      updated_by: model.updated_by,
    };
  }
  return {};
}
