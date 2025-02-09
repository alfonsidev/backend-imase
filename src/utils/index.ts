import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return compareSync(password, hash);
};

export const generateJWT = (payload: object, secret: string) => {
  return jwt.sign(payload, secret, {
    expiresIn: '180d',
  });
};

