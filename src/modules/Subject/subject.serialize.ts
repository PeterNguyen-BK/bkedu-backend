import { ISubjectResponse } from './subject.model';

export function serializeSubject(model: any): ISubjectResponse | object {
  if (model) {
    return {
      _id: model._id,
      name: model.name,
      teacher: model.teacher,
      class: model.class,
      posts: model.posts,
      exercises: model.exercises,
      files: model.files,
      created_at: model.created_at,
      updated_at: model.updated_at,
      created_by: model.created_by,
      updated_by: model.updated_by,
    };
  }
  return {};
}
