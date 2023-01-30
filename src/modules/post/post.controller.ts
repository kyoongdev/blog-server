import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { ResponseWithIdInterceptor } from 'utils';
import { CreatePostDTO, PostDTO, PostsDTO, UpdatePostDTO } from './dto';
import { FindPostsQuery } from './dto/query';
import { PostService } from './post.service';
@ApiTags('포스트')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @RequestApi({})
  @ResponseApi({
    type: PostsDTO,
    isPaging: true,
  })
  async findPosts(@Paging() paging: PagingDTO, @Query() query: FindPostsQuery) {
    return await this.postService.findPosts(paging, {
      where: {
        ...(query.tags && {
          tags: {
            some: {
              OR: query.tags.map((tag) => ({ tag: { name: tag } })),
            },
          },
        }),
      },
    });
  }

  @Get('/:id')
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({
    type: PostDTO,
  })
  async findPost(@Param('id') id: string) {
    return await this.postService.findPost(id);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    body: {
      type: CreatePostDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createPost(@Body() body: CreatePostDTO) {
    return await this.postService.createPost(body);
  }

  @Patch('/:id')
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: UpdatePostDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostDTO) {
    await this.postService.updatePost(id, body);
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
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}
