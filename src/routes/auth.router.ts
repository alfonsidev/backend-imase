import { Router } from "express";
import passport from "passport";
import { authLogin, authUser } from "../controllers";

const router: Router = Router();


router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  authLogin
);

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  authUser
);

export default router;
