import { NextFunction, Request, Response } from 'express';
import LRU from 'lru-cache';

const tokenCache = new LRU({
  max: parseInt(process.env.UNIQUE_TOKEN_PER_INTERVAL ?? '') || 500,
  maxAge: parseInt(process.env.RATE_LIMIT_INTERVAL ?? '') || 60 * 1000
});

const rateLimit = () => ({
    check: (res: Response, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        console.log('check', token);
        const tokenCount = (tokenCache.get(token) || [0]) as number[];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
          console.log('token set');
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader(
          'X-RateLimit-Remaining',
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject() : resolve();
      })
  });

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimit().check(
      res,
      parseInt(process.env.RATE_LIMIT_REQUESTS_PER_INTERVAL ?? '') || 10,
      req.ip
    );
    next();
  } catch {
    return res.status(429).json({ error: 'Too many requests' });
  }
}
