import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config/config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JWTStrategy = new Strategy(options, (payload: string, done) => {
  return done(null, payload);
});

export default JWTStrategy;
