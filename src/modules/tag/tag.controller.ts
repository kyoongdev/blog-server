import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { ResponseWithIdInterceptor } from 'utils';
import { JwtAuthGuard } from 'utils/guards';
import { Role, RoleInterceptorAPI } from 'utils/interceptor/role.interceptor';
import { CreateTagDTO, TagsDTO } from './dto';
import { TagService } from './tag.service';

@ApiTags('태그')
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
  @Auth(JwtAuthGuard)
  @UseInterceptors(ResponseWithIdInterceptor, RoleInterceptorAPI(Role.ADMIN))
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
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
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
