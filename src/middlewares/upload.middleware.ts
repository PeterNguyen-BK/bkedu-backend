import multer from 'multer';
import { Request } from 'express';
import { Error } from 'mongoose';
import path from 'path';

// Multer config
export function upload() {
  return multer({
    storage: multer.diskStorage({}),
    fileFilter: (req: Request, file: any, cb: any) => {
      const ext = path.extname(file.originalname);
      file.tail = ext.substr(1);
      if (file.fieldname === 'logo') {
        file.resource_type = 'image';
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          cb(new Error('File type is not supported'), false);
          return;
        }
      }

      if (file.fieldname === 'files') {
        if (ext === '.pdf') file.resource_type = 'image';
        else file.resource_type = 'raw';

        if (
          ext !== '.pptx' &&
          ext !== '.ppt' &&
          ext !== '.odp' &&
          ext !== '.pdf' &&
          ext !== '.zip' &&
          ext !== '.txt' &&
          ext !== '.docx' &&
          ext !== '.doc'
        ) {
          // throw "File type is not supported";
          cb(new Error('File type is not supported'), false);
          return;
        }
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}
