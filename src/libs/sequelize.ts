import { Sequelize } from 'sequelize-typescript'
import { Product } from '../db/models/product.model';
import { User } from '../db/models/user.model';
import { Service } from '../db/models/service.model';
import config from '../config/config';

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  port: 5432,
  logging: false,
  models: [Product, User, Service],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Permite certificados autofirmados si es necesario
    },
  }
});

export default sequelize

