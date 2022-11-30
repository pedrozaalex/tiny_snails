import { Router } from 'express';
import faunadb, { query as q } from 'faunadb';
import { object } from 'yup';
import generateRandomSlug from '../generateRandomSlug';
import jwtCheck from '../jwtCheck';
import {
  aliasValidator,
  snailOwnerValidator,
  urlValidator
} from '../../utils/validators';

const router = Router();
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY ?? ''
});

type topAliasesIndexResponse = { data: [number, string, string][] };

// return 50 most popular urls for leaderboard
router.get('/', async (_req, res, _next) => {
  try {
    const query = await faunaClient.query<topAliasesIndexResponse>(
      q.Paginate(q.Match(q.Index('top_aliases_by_clicks_new')), { size: 50 })
    );
    const result = query.data.map((item) => {
      return {
        clicks: item[0],
        alias: item[1],
        url: item[2]
      };
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

const schema = object().shape({
  owner: snailOwnerValidator,
  url: urlValidator,
  alias: aliasValidator
});

// create a new shortened url
router.post('/', jwtCheck(false), async (req: any, res, _next) => {
  const { url: urlFromRequest, slug: aliasFromRequest } = req.body;
  const owner = req.user?.sub ?? '';

  const url = decodeURI(urlFromRequest);
  const alias = aliasFromRequest ?? (await generateRandomSlug());

  try {
    await schema.validate({ owner, url, alias });
  } catch (error) {
    return res.status(400).json({ error: 'invalid data' });
  }

  // TODO auto generate sdk from fauna so we don't have to do "any"
  try {
    const { data }: any = await faunaClient.query(
      q.Create(q.Collection('snails'), {
        data: {
          url,
          alias,
          owner,
          clicks: 0
        }
      })
    );
    res.json(data);
  } catch (error: any) {
    if (error.requestResult?.statusCode === 400)
      return res.status(400).json({ error: 'alias already exists' });

    return res.status(500).json({ error });
  }
});

// get the url for a given alias
router.get('/:alias', async (req, res, _next) => {
  const alias = req.params.alias;
  const doc: any = await faunaClient.query(
    q.Get(q.Match(q.Index('aliases'), alias))
  );

  if (!doc.data) return res.status(404).json({ error: 'not found' });

  faunaClient.query(
    q.Update(q.Ref(doc.ref), { data: { clicks: doc.data.clicks + 1 } })
  );

  res.json(doc.data);
});

// destroy a shortened url
router.delete('/:alias', jwtCheck(), async (req: any, res, _next) => {
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
