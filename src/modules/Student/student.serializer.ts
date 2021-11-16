import { IStudentResponse } from './student.model';

export function serializeStudent(model: any): IStudentResponse | object {
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
      class: model.class,
    };
  }
  return {};
}
