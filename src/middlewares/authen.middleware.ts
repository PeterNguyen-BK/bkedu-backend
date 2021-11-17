import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { errorHandler } from '../common/services/response.service';
import { ErrorMessage, ErrorResponseCode } from '../utils/constants';

export const isAuthen = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string = <string>req.headers.authorization;
  const token: string = authHeader && authHeader.split(' ')[1];
  try {
    const decoded = <any>Jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    (<any>req).authenticatedUser = decoded._doc;
    next();
  } catch (err) {
    errorHandler(req, res, ErrorMessage.UNAUTHORIZED, ErrorResponseCode.UNAUTHORIZED);
  }
};
