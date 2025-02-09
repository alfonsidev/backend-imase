import type { Request, Response, NextFunction } from 'express'
import { uploadImage } from '../libs/cloudinary';
import ProductService from '../services/product.service';

const service = new ProductService()

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.create(req.body);
    res.status(201).json({ message: 'Producto creado' })
  } catch (error) {
    next(error);
  }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await service.find(req.query);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export const getProductByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params;
    const product = await service.findByName(name);
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (typeof body.image === 'string') {
      await service.update(id, body)
    }

    const imageString = await uploadImage(body.image)

    await service.update(id, {
      ...body,
      image: imageString.secure_url,
      public_id: imageString.public_id
    });
    res.status(201).json({ message: 'Producto actualizado' });
  } catch (error) {
    next(error);
  }
}

export const updateProductAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await service.findAvailibility(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
}



