import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
export declare class BucketService {
    private readonly configService;
    private readonly s3Object;
    constructor(configService: ConfigService);
    getStorage(): AWS.S3;
    upload(props: S3.Types.PutObjectRequest): Promise<string>;
}
