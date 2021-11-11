export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export enum UserRole {
  teacher = 'teacher',
  student = 'student',
}

export enum ErrorMessage {
  NOT_FOUND = 'Not Found',
  UNAUTHORIZED = 'Unauthorized',
  PERMISSION_DENIED = 'Permission Denied',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server',
}

export enum ErrorResponseCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
