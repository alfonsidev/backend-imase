import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateJWT = (payload: object, secret: string) => {
  return jwt.sign(payload, secret, {
    expiresIn: '180d',
  });
};

export const compareJWT = (token: string, secret: string) => {
  return jwt.verify(token, secret)

}

