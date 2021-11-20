import { Document, SchemaDefinition, Schema } from 'mongoose';

export interface IBase extends Document {
  _id: string;
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}

export function schemaBase(schema: SchemaDefinition = {}) {
  const defaultSchema: SchemaDefinition = {
    is_deleted: {
      type: Boolean,
      default: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  };

  return {
    ...schema,
    ...defaultSchema,
  };
}
