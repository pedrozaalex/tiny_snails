import { Router } from 'express';
const router = Router();

router.get('/', (_req, res, _next) => {
  return res.status(500).json({ error: 'Not implemented' });

  res.end('Hello world!');
});

export default router;
