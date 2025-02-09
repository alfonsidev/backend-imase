import { Sequelize } from 'sequelize-typescript'
import { Product } from '../db/models/product.model';
import { User } from '../db/models/user.model';
import { Service } from '../db/models/service.model';

const sequelize = new Sequelize({
  database: 'imase',
  dialect: 'postgres',
  username: 'postgres',
  password: '',
  logging: false,
  models: [Product, User, Service],
});

export default sequelize

