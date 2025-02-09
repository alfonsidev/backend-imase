import boom from '@hapi/boom'
import { hashPassword } from '../utils/index'
import { User } from '../db/models/user.model';
import { PostUserI } from '../interfaces/User';

class UserService {
  constructor() { }

  async create(data: PostUserI) {
    const user = await User.findOne({
      where: { email: data.email },
    });
    if (user) {
      throw boom.notFound('Usuario ya existe');
    }
    const hash = await hashPassword(data.password);
    const newUser = await User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await User.findAll();
    return rta;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw boom.notFound('Usuario no registrado');
    }
    return user;
  }

  async findOne(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    return user;
  }

  async update(id: string, changes: object) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

export default UserService;
