import { model, Schema, Types } from 'mongoose';
import { IBase, SchemaBase } from './base.entity';
import { Status, UserRole } from '@src/utils/constants';
import { schemaName } from './schemaName.entity';
import bcrypt from 'bcrypt';

export interface IUser extends IBase {
  first_name: string,
  last_name: string,
  address: string,
  birthday: string,
  password: string,
  phone_number: string,
  role: UserRole,
  status: Status,
};

const userSchema = new Schema(SchemaBase({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  // address: {
  //   type: String,
  // },
  // birthday: {
  //   type: String,
  // },
  password: {
    type: String,
  },
  // phone_number: {
  //   type: String,
  // },
  role: {
    type: UserRole,
    default: UserRole.student,
  },
  status: {
    type: Status,
    default: Status.inactive,
  }
}), {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
}
);

userSchema.pre('save', async function() {
  const salt = process.env.SALT_ROUNDS || 10;
  this.password = await bcrypt.hash(this.password, salt);
});

export default model<IUser>(schemaName.userSchemaName, userSchema);
