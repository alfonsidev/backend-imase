import { v2 } from 'cloudinary';
import config from '../config/config';
import boom from '@hapi/boom';
import { Image } from 'src/interfaces/Product';

v2.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
});

export const uploadImage = async (file: Image) => {
  try {
    const uploadResponse = await v2.uploader.upload(file.path, {
      upload_preset: 'dev_setups',
    });


    const image = {
      secure_url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    }
    return image;
  } catch (error) {
    console.log(error);
    throw boom.notFound('error al subir la imagen')
  }
};

export const deleteImage = async (public_id: string) => {
  try {
    await v2.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
  }
};

