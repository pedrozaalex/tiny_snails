import express from 'express';

// routers
import hello from './hello';
import url from './url';

const app = express();
app.use(express.json());

app.use('/hello', hello);
app.use('/url/', url);

if (require.main === module) {
  const port = 3001;
  app.listen(port);
}

export default app;
