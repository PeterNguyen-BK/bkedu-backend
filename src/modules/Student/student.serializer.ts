import { IStudentResponse } from './student.model';

export function serializeStudent(model: any): IStudentResponse | object {
  if (model) {
    return {
      _id: model._id,
      name: model.name,
      phone_number: model.phone_number,
      status: model.status,
      is_first_login: model.is_first_login,
      class: model.class,
      created_at: model.created_at,
      updated_at: model.updated_at,
      created_by: model.created_by,
      updated_by: model.updated_by,
    };
  }
  return {};
}
