import { NextFunction, Request, Response } from 'express';
import LRU from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

const rateLimit = (options: Options) => {
  const tokenCache = new LRU({
    max: options.uniqueTokenPerInterval || 500,
    maxAge: options.interval || 60000
  });

  return {
    check: (res: Response, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) || [0]) as number[];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
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
  };
};

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimit({
      uniqueTokenPerInterval:
        parseInt(process.env.UNIQUE_TOKEN_PER_INTERVAL ?? '') || 500,
      interval: parseInt(process.env.RATE_LIMIT_INTERVAL ?? '') || 1000
    }).check(res, parseInt(
      process.env.RATE_LIMIT_REQUESTS_PER_INTERVAL ?? ''
    ) || 4, req.ip);
    next();
  } catch {
    res.status(429).json({ error: 'Too many requests' });
  }
}
