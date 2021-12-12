import express from 'express';
import morgan from 'morgan';

// routers
import hello from './hello';
import url from './url';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/hello', hello);
app.use('/url/', url);

export default app;
