import { Request, Response, NextFunction } from 'express';
import { ErrorResponseCode } from '@src/utils/constants';
import { errorHandler } from '@src/common/services/response.service';

export const isAuthor = (...permittedRoles: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (<any>req).authenticatedUser?.role;
    if (role && permittedRoles.includes(role)) {
      (<any>req).authorizedUser = (<any>req).authenticatedUser;
      next();
    } else {
      errorHandler(req, res, 'You do not have permission to access this feature', ErrorResponseCode.FORBIDDEN);
    }
  };
};
