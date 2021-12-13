import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

/**
 *  Returns a middleware function that will check the authorization header
 * The middleware will call next() if the authorization header is valid
 * If credentialsRequired is set to false, the middleware will call next(),
 * even if the authorization header is not present
 * */
const jwtCheck = (credentialsRequired = true) =>
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-vz68qmuc.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://tny-snls.xyz/api/',
    issuer: 'https://dev-vz68qmuc.us.auth0.com/',
    algorithms: ['RS256'],
    credentialsRequired
  });

export default jwtCheck;
