import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';

export interface IClass extends IBase {
  name: string;
  num_of_students: number;
  form_teacher: string;
}

const classSchema = new Schema(
  schemaBase({
    name: {
      type: String,
    },
    num_of_students: {
      type: Number,
      default: 0,
    },
    form_teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default model<IClass>(schemaName.classSchemaName, classSchema);
