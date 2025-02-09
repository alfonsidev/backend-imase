import { Application, Router } from 'express';
import routerProducts from './products.router';
import routerProduct from './product.router';
import routerServices from './services.router';
import routerService from './service.router';
import routerContact from './contact.router';
import routerUser from './users.router';
import routerAuth from './auth.router';


const routerApi = (app: Application) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/productos', routerProducts);
  router.use('/producto', routerProduct)
  router.use('/servicios', routerServices);
  router.use('/servicio', routerService)
  router.use('/contacto', routerContact);
  router.use('/users', routerUser);
  router.use('/auth', routerAuth);
};

export default routerApi;
