import { Router } from 'express';
import { postContact } from '../controllers/contact.controller';
import validatorHandler from '../middleware/validator.handler';
import { createContactSchema } from '../schemas/contact.schema';

const router: Router = Router();

router.post(
  '/',
  validatorHandler(createContactSchema, 'body'),
  postContact
);

export default router;
