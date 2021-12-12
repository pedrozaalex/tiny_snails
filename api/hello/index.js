import { Router } from 'express';
const router = Router();

router.get('/', (_req, res, _next) => {
  throw new Error('Something went wrong!');

  // res.end('Hello world!');
});

export default router;
