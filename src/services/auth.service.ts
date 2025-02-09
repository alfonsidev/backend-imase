import boom from '@hapi/boom';
import { comparePassword } from '../utils';
import UserService from './user.service';

const service = new UserService();

class AuthService {
  async getUserByEmail(email: string, password: string) {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
    } catch (error) {
      console.log(error)
      throw boom.notFound('Hubo un error al buscar el usuario');
    }
  }

}

export default AuthService;
