import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Request as Req } from 'express';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { Cookie, ResponseWithIdInterceptor, UserCookieInterceptor } from 'utils';
import { JwtAuthGuard } from 'utils/guards';
import { Role, RoleInterceptorAPI } from 'utils/interceptor/role.interceptor';
import { CreatePostDTO, PostDTO, PostsDTO, UpdatePostDTO } from './dto';
import { FindPostsQuery } from './dto/query';
import { PostService } from './post.service';
@ApiTags('포스트')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/all')
  @RequestApi({})
  @ResponseApi({
    type: ResponseWithIdDTO,
    isArray: true,
  })
  async findAllPosts() {
    return await this.postService.findAllPosts();
  }

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
              OR: query.tags.map((tag) => ({ tag: { id: tag } })),
            },
          },
        }),
      },
    });
  }

  @Get('/:id/detail')
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

  @Post('/:id/viewCount')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true), ResponseWithIdInterceptor, UserCookieInterceptor)
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
  async increasePostViewCount(@Param('id') id: string, @Cookie() cookie: string) {
    if (cookie) return;
    await this.postService.increaseViewCount(id);
  }

  @Post()
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN), ResponseWithIdInterceptor)
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
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
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
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}
