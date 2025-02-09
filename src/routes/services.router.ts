import { Router } from 'express';
import validatorHandler from '../middleware/validator.handler';
import {
  createServiceSchema,
  updateServiceSchema,
  getServiceSchema,
} from '../schemas/service.schema'
import { deleteService, getServiceById, getServices, postService, updateService, updateServiceAvailibility } from '../controllers/service.controller';

const router: Router = Router();

router.post(
  '/',
  validatorHandler(createServiceSchema, 'body'),
  postService
);

router.get('/', getServices);

router.get('/:id', getServiceById);

router.put(
  '/:id',
  validatorHandler(getServiceSchema, 'params'),
  validatorHandler(updateServiceSchema, 'body'),
  updateService
);

router.patch('/:id', updateServiceAvailibility);

router.delete(
  '/:id',
  validatorHandler(getServiceSchema, 'params'),
  deleteService
);

export default router;
