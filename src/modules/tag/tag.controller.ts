import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { ResponseWithIdInterceptor } from 'utils';
import { CreateTagDTO, TagsDTO } from './dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @RequestApi({})
  @ResponseApi({
    type: TagsDTO,
    isArray: true,
  })
  async getTags() {
    return await this.tagService.findTags();
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    body: {
      type: CreateTagDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createTag(@Body() body: CreateTagDTO) {
    return await this.tagService.createTags(body);
  }

  @Delete('/:id')
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteTag(@Param('id') id: string) {
    await this.tagService.deleteTag(id);
  }
}
