import { ITeacherResponse } from './teacher.model';

export function serializeTeacher(model: any): ITeacherResponse | object {
  if (model) {
    return {
      _id: model._id,
      name: model.name,
      email: model.email,
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
