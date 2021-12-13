import faunadb from 'faunadb';

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

export default generateRandomSlug;