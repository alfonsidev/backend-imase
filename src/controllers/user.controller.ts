import { Request, Response, NextFunction } from 'express'
import userService from '../services/user.service'

const service = new userService();

export const getIdUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
}



