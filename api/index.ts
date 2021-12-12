import express from 'express';
import morgan from 'morgan';

// routers
import hello from './hello';
import snails from './snails';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/hello', hello);
app.use('/snails', snails);

export default {
  path: '/api',
  handler: app
};
