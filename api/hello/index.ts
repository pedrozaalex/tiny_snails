import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.end('Hello world!');
});

export default router;
