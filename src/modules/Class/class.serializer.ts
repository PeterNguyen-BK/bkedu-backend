import { IClassResponse } from './class.model';

export function serializeClass(model: any): IClassResponse | object {
  if (model) {
    return {
      _id: model._id,
      name: model.name,
      num_of_students: model.num_of_students,
      form_teacher: model.form_teacher,
      created_at: model.created_at,
      updated_at: model.updated_at,
      created_by: model.created_by,
      updated_by: model.updated_by,
    };
  }
  return {};
}
