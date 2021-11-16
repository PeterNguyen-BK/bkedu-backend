import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';
import User, { IUser } from './user.entity';

export type ITeacher = IUser;

const teacherSchema = new Schema(schemaBase());

export default User.discriminator<ITeacher>(schemaName.teacherSchemaName, teacherSchema);
