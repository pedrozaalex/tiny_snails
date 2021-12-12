import { Router } from 'express';
const router = Router();

// type Url = {
//   id: number;
//   url: string;
//   alias: string;
//   clicks: number;
// };

const urls = []; // Url[]

// return 100 most popular urls
router.get('/', (_req, _res, _next) => {
  return res.status(500).json({ error: 'Not implemented' });

  _res.json(urls.sort((a, b) => b.clicks - a.clicks).slice(0, 100));
});

// create a new shortened url
router.post('/', (req, res, _next) => {
  return res.status(500).json({ error: 'Not implemented' });

  const id = urls.length + 1;
  const url = req.body.url;
  // if no alias is provided, generate a random one
  const alias = req.body.slug || Math.random().toString(36).substring(2, 15);
  const newUrl = { id, url, alias, clicks: 0 };
  urls.push(newUrl);
  res.json(newUrl);
});

// get the url for a given alias
router.get('/:alias', (req, res, _next) => {
  return res.status(500).json({ error: 'Not implemented' });

  const alias = req.params.alias;
  const url = urls.find((url) => url.alias === alias);
  if (url) {
    url.clicks++;
    res.json(url);
  } else {
    res.status(404).send('Not found');
  }
});

export default router;
