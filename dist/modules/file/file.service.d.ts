/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { BucketService } from 'utils';
import { UploadedFileDTO } from './dto';
export declare class FileService {
    private readonly bucketService;
    private readonly config;
    constructor(bucketService: BucketService, config: ConfigService);
    uploadImage(file: Express.Multer.File): Promise<UploadedFileDTO>;
}
