import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { UploadedFileDTO } from './dto';
import { FileService } from './file.service';

@ApiTags('파일')
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
  @ResponseApi(
    {
      type: UploadedFileDTO,
    },
    201
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.uploadImage(file);
  }
}
