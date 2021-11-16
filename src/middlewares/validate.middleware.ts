import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '@src/common/services/response.service';

export function commonValidateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { error, value } = schema.validate(data);
    if (error) errorHandler(req, res, error, 400);
    else next();
  };
}

export function commonValidateQuery(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.query;
    const { error, value } = schema.validate(data);
    if (error) errorHandler(req, res, error, 400);
    else next();
  };
}
