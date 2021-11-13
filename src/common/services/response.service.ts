import { Request, Response } from 'express';

export const successHandler = (req: Request, res: Response, data: any, message: string, code?: any) => {
  if (!res.headersSent) {
    res.status(code || 200).json({
      success: true,
      message,
      result: data,
      code: code || 200,
    });
  }
};

export const errorHandler = (req: Request, res: Response, error: any, code?: any) => {
  let returnCode;
  let message;
  if (typeof error !== 'string') {
    if (error.name === 'CastError') {
      message = `Invalid ${error.path}: ${error.value}`;
      returnCode = 400;
    } else if (error.name === 'ValidationError') {
      const errors = Object.values(error.details).map((el: any) => el.message);
      message = `Invalid input data. ${errors.join('. ')}`;
      returnCode = 400;
    } else {
      message = error.message;
      returnCode = error.statusCode ? error.statusCode : 500;
    }
  } else {
    message = error;
    returnCode = code || 500;
  }
  const result = {
    success: false,
    message: message || 'Internal Server',
    code: returnCode,
  };
  if (!res.headersSent) {
    res.status(code || returnCode).json(result);
  }
};
