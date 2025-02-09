import boom from '@hapi/boom';
import { Op, FindOptions } from 'sequelize';
import { uploadImage, deleteImage } from '../libs/cloudinary';
import { Product } from '../db/models/product.model';
import { PostProductT, UpdateProductT } from '../interfaces/Product';
import { PostProductDTO } from '../Dto/ProductDTO';
import { QueryI } from '../interfaces';

class ProductService {
  async create(body: PostProductT): Promise<PostProductDTO> {
    const productExist = await Product.findOne({
      where: { name: body.name },
    });
    // validar si el producto ya existe
    if (productExist) {
      throw boom.badRequest('Producto ya existe');
    }

    // subir imagen a cloudinary
    const { public_id, secure_url } = await uploadImage(body.image);

    const product = {
      name: body.name,
      description: body.description,
      image: secure_url,
      public_id,
      url: body.url,
    }

    // crear producto
    const newProduct = await Product.create(product);

    return newProduct;
  }

  async find(query: QueryI) {
    try {
      const options: FindOptions = {
        where: {},
        order: [['name', 'DESC']],
      };

      const { limit, offset } = query;
      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

      const { search } = query;
      if (search) {
        options.where = {
          ...options.where,
          name: {
            [Op.iLike]: `%${search}%`,
          }
        };
      }

      const products = await Product.findAll(options);
      const count = await Product.count(options);
      return { products, count };
    } catch (error) {
      console.log(error)
      throw boom.notFound('No fue posible encontrar los productos');
    }
  }

  // Product by name
  async findByName(name: string) {
    const product = await Product.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}`
        }
      }
    })
    if (!product) {
      throw boom.notFound('No se encontro el producto');
    }
    return product
  }

  async findOne(id: string) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw boom.notFound('no se encontro el producto');
    }
    return product;
  }

  async findAvailibility(id: string) {
    const findProduct = await this.findOne(id);

    findProduct.available = !findProduct.dataValues.available;
    return await findProduct.save();
  }

  async update(id: string, body: UpdateProductT) {
    const findProduct = await this.findOne(id);

    if (body.image !== findProduct.image) {
      await deleteImage(findProduct.public_id);
    }

    findProduct.name = body.name;
    findProduct.description = body.description;
    findProduct.image = body.image
    findProduct.public_id = body.public_id;
    findProduct.url = body.url;
    await findProduct.save();

    return findProduct;
  }

  async delete(id: string) {
    const findProduct = await this.findOne(id);
    await deleteImage(findProduct.public_id);
    await findProduct.destroy();
  }
}

export default ProductService;
