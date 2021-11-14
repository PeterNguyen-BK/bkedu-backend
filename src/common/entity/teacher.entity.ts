import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';
import User from './user.entity';

const teacherSchema = new Schema(schemaBase());

export default User.discriminator(schemaName.teacherSchemaName, teacherSchema);
