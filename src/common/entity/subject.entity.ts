import { model, Schema } from 'mongoose';
import { IBase, schemaBase } from './base.entity';
import { schemaName } from './schemaName';

export interface IFile extends IBase {
  original_name: string;
  public_id: string;
  url: string;
}

export interface ISubmit extends IBase {
  files: [IFile];
  point?: number;
}

export interface IExercise {
  title: string;
  description?: string;
  deadline: Date;
  files?: [IFile];
  submits: [ISubmit];
}

export interface IReply extends IBase {
  content: string;
}

export interface IPost extends IBase {
  content: string;
  replies: [IReply];
}

export interface ISubject extends IBase {
  name: string;
  teacher: string;
  class: string;
  posts: [IPost];
  exercises: [IExercise];
  files: [IFile];
}

const replySchema = new Schema(
  schemaBase({
    content: {
      type: String,
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const postSchema = new Schema(
  schemaBase({
    content: {
      type: String,
    },
    replies: {
      type: [replySchema],
      default: [],
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const fileSchema = new Schema(
  schemaBase({
    original_name: {
      type: String,
    },
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const submitSchema = new Schema(
  schemaBase({
    files: {
      type: [fileSchema],
      required: true,
    },
    point: {
      type: Number,
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const exerciseSchema = new Schema<IExercise>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  files: {
    type: [fileSchema],
  },
  submits: {
    type: [submitSchema],
  },
});

const subjectSchema = new Schema(
  schemaBase({
    name: {
      type: String,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
    posts: {
      type: [postSchema],
      default: [],
    },
    exercises: {
      type: [exerciseSchema],
      default: [],
    },
    files: {
      type: [fileSchema],
      default: [],
    },
  }),
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default model<ISubject>(schemaName.subjectSchemaName, subjectSchema);
