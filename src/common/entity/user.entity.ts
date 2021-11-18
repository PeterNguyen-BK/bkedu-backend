import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IBase, schemaBase } from './base.entity';
import { AppError } from '@src/utils/error';
import { Status, UserRole } from '@src/utils/constants';
import { schemaName } from './schemaName';

export interface IUser extends IBase {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  birthday: string;
  password: string;
  phone_number: string;
  role: UserRole;
  status: Status;
  isFirstLogin: boolean;
}

const userSchema = new Schema(
  schemaBase({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.inactive,
    },
    is_first_login: {
      type: Boolean,
      default: false,
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    discriminatorKey: 'role',
  }
);

userSchema.pre('save', async function () {
  try {
    const salt = parseInt(<string>process.env.SALT_ROUNDS, 10) || 10;
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw new AppError(error, 400);
  }
});

export default model<IUser>(schemaName.userSchemaName, userSchema);
