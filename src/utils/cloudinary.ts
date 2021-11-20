import cloudinary from 'cloudinary';
import 'dotenv/config';

cloudinary.v2.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

export function uploadFile(item: any, folder: string) {
  return new Promise((resolve, reject) => {
    const options = { folder, resource_type: item.resource_type, format: item.tail };
    cloudinary.v2.uploader.upload(item.path, options, (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

export async function destroyFile(id: string, resource_type: string) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(
      id,
      {
        invalidate: true,
        resource_type,
      },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}

export async function downloadFile(public_id: string, format: string, resource_type: string) {
  try {
    return new Promise(resolve => {
      cloudinary.v2.utils.private_download_url(public_id, format, { resource_type, type: 'upload' });
    });
  } catch (error) {
    throw error;
  }
}
