import { Router } from 'express';
import faunadb from 'faunadb';

const router = Router();
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY ?? ''
});
const q = faunadb.query;

// return 100 most popular urls
router.get('/', (_req, _res, _next) => {
  // _res.json(urls.sort((a, b) => b.clicks - a.clicks).slice(0, 100));
  _res.json({ error: 'not implemented' });
});

// create a new shortened url
router.post('/', async (req, res, _next) => {
  const url = req.body.url;
  const alias = req.body.slug || Math.random().toString(36).substring(2, 15);

  // TODO auto generate sdk from fauna so we don't have to do "any"
  const { data }: any = await faunaClient.query(
    q.Create(q.Collection('snails'), {
      data: {
        alias,
        url,
        clicks: 0
      }
    })
  );

  res.json(data);
});

// get the url for a given alias
router.get('/:alias', async (req, res, _next) => {
  const alias = req.params.alias;
  const doc: any = await faunaClient.query(
    q.Get(q.Match(q.Index('aliases'), alias))
  );

  await faunaClient.query(
    q.Update(q.Ref(doc.ref), { data: { clicks: doc.data.clicks + 1 } })
  );

  res.json(doc.data);
});

export default router;
