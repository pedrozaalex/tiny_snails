import express from 'express';
import morgan from 'morgan';

// routers
import hello from './hello';
import url from './url';

// prevent unhandled rejections from stopping the process
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/hello', hello);
app.use('/url', url);

export default {
  path: '/api',
  handler: app
};
