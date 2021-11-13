import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';
import User from './user.entity';

export interface IStudent extends IBase {
  class: string;
}

const studentSchema = new Schema(
  schemaBase({
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
  })
);

User.discriminator(schemaName.studentSchemaName, studentSchema);
