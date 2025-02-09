import { Router } from 'express';
import { getIdUser, getAllUsers, postUser, patchUser, deleteUser } from "../controllers/user.controller";
import passport from "passport";
import validatorHandler from "../middleware/validator.handler";
import { createUserSchema, getUserSchema } from "../schemas/user.schema";

const router: Router = Router();

router.get('/', getAllUsers);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  getIdUser
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  postUser
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  patchUser
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  deleteUser
);

export default router;
