import boom from '@hapi/boom';
import { FindOptions, Op } from 'sequelize';
import { uploadImage, deleteImage } from '../libs/cloudinary'
import { Service } from '../db/models/service.model';
import { PostServiceT } from '../interfaces/Service';
import { PostProductDTO } from '../Dto/ProductDTO';
import { QueryI } from '../interfaces';



class ServicesService {
  async create(body: PostServiceT): Promise<PostProductDTO> {
    const { name, description, image, url } = body;
    const serviceExist = await Service.findOne({
      where: { name },
    });
    if (serviceExist) {
      boom.badRequest('Servicio ya existe');
    }
    const convertImage = await uploadImage(image);
    const service = {
      name,
      description,
      image: convertImage.secure_url,
      public_id: convertImage.public_id,
      url,
    };
    const result = await Service.create(service);
    return result;
  }

  async find(query: QueryI) {

    try {
      const options: FindOptions = {
        where: {},
        order: [['createdAt', 'DESC']],
      };

      const { limit, offset } = query;

      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

      const { name } = query;
      if (name) {
        options.where = {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        }
      }
      const services = await Service.findAll(options);
      const servicesCount = await Service.count(options);
      return {
        services,
        servicesCount,
      };
    } catch (error) {
      console.log(error)
      throw boom.badImplementation('Error al encontrar el servicio');
    }
  }

  async findByName(name: string) {
    try {
      const service = await Service.findOne({
        where: {
          name: {
            [Op.iLike]: `%${name}`
          }
        }
      })
      return service
    } catch (error) {
      console.log(error)
      throw boom.notFound('No se encontro el servicio')
    }
  }


  async findOne(id: string): Promise<Service> {
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        throw boom.notFound('Servicio no encontrado');
      }
      return service;
    } catch (error) {
      console.log(error)
      throw boom.notFound('servicio no disponible');
    }
  }

  async findAvailibility(id: string) {
    const findService = await this.findOne(id);

    findService.available = !findService.dataValues.available;
    return await findService.save();
  }

  async update(id: string, body: any) {
    const findService = await this.findOne(id);
    if (body.image !== findService.image) {
      await deleteImage(findService.public_id);
      body.image = await uploadImage(body.image);
    }

    findService.name = body.name;
    findService.description = body.description;
    findService.image = body.image?.secure_url;
    findService.public_id =
      body.image !== findService.image
        ? body.image.public_id
        : findService.public_id;

    await findService.save();

    return findService;
  }

  async delete(id: string) {
    const findService = await this.findOne(id);
    await deleteImage(findService.public_id);
    await findService.destroy();
  }
}

export default ServicesService;

