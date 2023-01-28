import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { BucketService } from 'utils';
import { UploadedFileDTO } from './dto';

@Injectable()
export class FileService {
  constructor(private readonly bucketService: BucketService, private readonly config: ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    const params: S3.Types.PutObjectRequest = {
      Bucket: 'kyoongdev-blog',
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const result = await this.bucketService.upload(params);

    if (!result) throw new InternalServerErrorException('업로드에 실패했습니다.');

    return new UploadedFileDTO(result);
  }
}
