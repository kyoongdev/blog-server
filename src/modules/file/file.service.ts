import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import AWS from '@aws-sdk/client-s3';

import { UploadedFileDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    try {
      const key = `${Date.now() + file.originalname}`;

      await new AWS.S3({
        region: 'Singapore',
        endpoint: this.configService.get('S3_BUCKET_NAME'),
        credentials: {
          accessKeyId: this.configService.get('S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('S3_SECRET_KEY'),
        },
      }).putObject({
        Key: key,
        Body: file.buffer,
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      });

      const url = `${this.configService.get('AWS_S3_BUCKET_URL')}${key}`;

      return new UploadedFileDTO(url);
    } catch (error) {
      console.log(error);
    }
  }
}
