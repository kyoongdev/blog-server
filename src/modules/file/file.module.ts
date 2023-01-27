import { Module } from '@nestjs/common';
import { BucketService } from 'utils';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService, BucketService],
})
export class FileModule {}
