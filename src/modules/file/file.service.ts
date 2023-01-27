import { AbortMultipartUploadCommand, AbortMultipartUploadCommandInput } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { BucketService } from 'utils';

@Injectable()
export class FileService {
  constructor(private readonly bucketService: BucketService, private readonly config: ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    const s3 = this.bucketService.getStorage();
    const params: S3.Types.PutObjectRequest = {
      Bucket: 'kyoongdev-blog',
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
    };

    s3.upload(params).send((err, data) => {
      console.log({ err, data });
    });

    return '';
  }
}
