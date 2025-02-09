import { Strategy } from 'passport-local';
import AuthService from 'src/services/auth.service';

const service = new AuthService();

const localStrategy = new Strategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await service.getUserByEmail(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStrategy;
