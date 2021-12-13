import { Router } from 'express';
import faunadb from 'faunadb';
import jwtCheck from '../jwtCheck';

const router = Router();
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY ?? ''
});
const q = faunadb.query;

const generateRandomSlug = async (tries: number = 0): Promise<string> => {
  const chars = process.env.SLUG_CHARS ?? 'abcdefghijklmnopqrstuvwxyz';
  const length = process.env.SLUG_LENGTH ?? 6;
  const maxTries = process.env.SLUG_MAX_TRIES ?? 5;

  const slugExists = async (s: string) =>
    await faunaClient.query(q.Exists(q.Match(q.Index('aliases'), s)));

  const slug = [...Array(length).keys()]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');

  const exists = await slugExists(slug);

  if (!exists) return slug;
  else if (tries < maxTries) return generateRandomSlug(tries + 1);

  throw new Error('Could not generate unique slug');
};

// return 100 most popular urls
router.get('/', (_req, _res, _next) => {
  // _res.json(urls.sort((a, b) => b.clicks - a.clicks).slice(0, 100));
  _res.json({ error: 'not implemented' });
});

// create a new shortened url
router.post('/', async (req, res, _next) => {
  const url = req.body.url;
  const alias = req.body.slug || (await generateRandomSlug());
  const owner = req.body.owner || '';

  // TODO auto generate sdk from fauna so we don't have to do "any"
  const { data }: any = await faunaClient.query(
    q.Create(q.Collection('snails'), {
      data: {
        alias,
        url,
        owner,
        clicks: 0
      }
    })
  );

  res.json(data);
});

// get the url for a given alias
router.get('/:alias', async (req, res, _next) => {
  console.log('getting url for alias: ', req.params.alias);
  const alias = req.params.alias;
  const doc: any = await faunaClient.query(
    q.Get(q.Match(q.Index('aliases'), alias))
  );

  await faunaClient.query(
    q.Update(q.Ref(doc.ref), { data: { clicks: doc.data.clicks + 1 } })
  );

  res.json(doc.data);
});

// destroy a shortened url
router.delete('/:alias', jwtCheck, async (req: any, res, _next) => {
  const alias = req.params.alias;
  const doc: any = await faunaClient.query(
    q.Get(q.Match(q.Index('aliases'), alias))
  );

  if (doc.data.owner === req.user.sub) {
    await faunaClient.query(q.Delete(q.Ref(doc.ref)));

    res.json({ success: true });
  } else {
    res.status(403).json({ success: false, error: 'not authorized' });
  }
});

export default router;
