import { Router } from 'express';
import passport from 'passport';
import validatorHandler from '../middleware/validator.handler';
import { createProductSchema } from '../schemas/product.schema';
import { deleteProduct, getProductById, getProducts, postProduct, updateProduct, updateProductAvailability } from '../controllers/product.controller';


const router: Router = Router();


router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  postProduct
);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateProduct
);

router.patch('/:id', updateProductAvailability);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteProduct
);

export default router;
