import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// routers
import hello from './hello';
import snails from './snails';
import owners from './owners';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/hello', hello);
app.use('/snails', snails);
app.use('/owners', owners);

app.use(
  (
    err: { message: any; stack: any },
    _req: any,
    res: { json: (arg0: { message: any; stack: any }) => void },
    _next: any
  ) => {
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }
);

export default {
  path: '/api',
  handler: app
};
