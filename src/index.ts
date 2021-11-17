import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from '@src/config/config';
import User from '@src/common/entity/user.entity';
import { CombineRoute } from './modules/route';

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(async () => {
    const app = express();
    config(app);

    const combineRoute = new CombineRoute();
    combineRoute.start(app);

    app.get('/', async (req: Request, res: Response) => {
      res.send('BK Education');
    });

    const port = process.env.PORT || 5000;
    
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch(error => console.log(error));
