import express from 'express';
import morgan from 'morgan';

// routers
import hello from './hello';
import snails from './snails';
import owners from './owners';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/hello', hello);
app.use('/snails', snails);
app.use('/owners', owners);

export default {
  path: '/api',
  handler: app
};
