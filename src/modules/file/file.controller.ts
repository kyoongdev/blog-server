import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 1024 * 1024 * 10 } }))
  @RequestApi({
    body: {
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log({ file });
    await this.fileService.uploadImage(file);
  }
}
