import { Router } from 'express';
import faunadb from 'faunadb';
import jwtCheck from '../jwtCheck';

const router = Router();
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY ?? ''
});
const q = faunadb.query;

// returns all of an owner's snails
router.get('/', jwtCheck(), async (req: any, res) => {
  try {
    const docs: any = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('alias_by_owner'), req.user.sub)),
        q.Lambda('alias', q.Get(q.Var('alias')))
      )
    );
    res.status(200).send(docs.data);
  } catch (error) {
    res.status(400).send("Couldn't find your snails :(");
  }
});

export default router;
