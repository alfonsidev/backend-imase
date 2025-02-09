import { Request, Response, NextFunction } from 'express'
import Services from '../services/service.service'
import { uploadImage } from '../libs/cloudinary';


const service = new Services();

export const postService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.create(req.body);
    res.status(201).json({ message: 'Servicio creado' });
  } catch (error) {
    next(error);
  }
}

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await service.find(req.query);

    res.json(services);
  } catch (error) {
    next(error);
  }
}

export const getServiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {

    if (typeof req.body.image === 'string') {
      await service.update(id, req.body)
    }

    const convertImage = await uploadImage(req.body.image)

    await service.update(id, {
      ...req.body,
      image: convertImage.secure_url,
      public_id: convertImage.public_id
    })

    res.json({ message: 'Servicio actualizado.' });
  } catch (error) {
    next(error);
  }
}

export const updateServiceAvailibility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await service.findAvailibility(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ message: 'Servicio eliminado.' })
  } catch (error) {
    next(error);
  }
}

export const getServiceByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params
    const servicebyName = await service.findByName(name)
    res.json(servicebyName)
  } catch (error) {
    next(error)
  }
}


