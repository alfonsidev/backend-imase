import { Request, Response, NextFunction } from 'express'
import Contact from '../services/contact.service'

const service = new Contact()

export const postContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await service.send(req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

