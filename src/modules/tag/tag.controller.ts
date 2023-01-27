import { Controller, Get, Post } from '@nestjs/common';
import { RequestApi, ResponseApi } from 'kyoongdev-nestjs';
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
  @RequestApi({
    body : {
      type : CreateTagDTO
    }

  })

}
