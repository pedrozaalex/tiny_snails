import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export default jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-vz68qmuc.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://tny-snls.xyz/api/',
  issuer: 'https://dev-vz68qmuc.us.auth0.com/',
  algorithms: ['RS256']
});
