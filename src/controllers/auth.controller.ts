import type { Request, Response, NextFunction } from "express";
import { generateJWT } from "../utils";
import config from "../config/config";
import UserService from "../services/user.service";

interface User {
  id: string;
  role: string
}

const service = new UserService()

export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = generateJWT(payload, config.jwtSecret);
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.env === 'production' ? true : false,
      sameSite: config.env === 'production' ? 'strict' : 'none',
    });
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
}

interface UserI {
  sub?: string;
}

export const authUser = async (req: Request, res: Response) => {
  const payload: UserI = req.user!
  const user = await service.findOne(payload?.sub as string)
  delete user.dataValues.password
  res.status(200).json(user)
}


