import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class BucketService {
  private readonly s3Object: AWS.S3;
  constructor(private readonly configService: ConfigService) {
    this.s3Object = new AWS.S3({
      region: 'Singapore',
      endpoint: this.configService.get('S3_BUCKET_NAME'),
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
    });
  }

  getStorage() {
    return this.s3Object;
  }

  upload(props: S3.Types.PutObjectRequest) {
    return new Promise<string | null>((resolve) => {
      this.s3Object.upload(props, (err, data) => {
        if (err) {
          console.log(err);
          resolve(null);
        }
        if (data) {
          resolve(data.Location);
        }
      });
    });
  }
}
