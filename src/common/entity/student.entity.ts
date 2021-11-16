import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';
import User, { IUser } from './user.entity';

export interface IStudent extends IUser {
  class: string;
}

const studentSchema = new Schema(
  schemaBase({
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      default: null,
    },
  })
);

export default User.discriminator<IStudent>(schemaName.studentSchemaName, studentSchema);
