import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { CreatePostDTO, PostDTO, PostsDTO, UpdatePostDTO } from './dto';
@Injectable()
export class PostService {
  constructor(private readonly database: PrismaService) {}

  async findPost(id: string) {
    const { tags, ...rest } = await this.database.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return new PostDTO({ ...rest, tags: tags.map((tag) => tag.tag.name) });
  }

  async findPosts(paging: PagingDTO, args = {} as Prisma.PostFindManyArgs) {
    const { take, skip } = paging.getSkipTake();
    const count = await this.database.post.count({
      where: { ...args.where },
    });

    const data = await this.database.post.findMany({
      where: {
        ...args.where,
      },
      include: {
        tags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const rows = data.map((post) => {
      const { tags, ...rest } = post;
      return new PostsDTO({ ...rest, tags: tags.map((tag) => tag.tag.name) });
    });

    return new PaginationDTO<PostsDTO>(rows, { count, paging });
  }

  async createPost(props: CreatePostDTO) {
    const { tags, keywords, ...rest } = props;

    const kewordIds = await Promise.all(
      keywords.map(async (keyword) => {
        const isExist = await this.database.keyword.findFirst({
          where: {
            name: keyword,
          },
        });

        if (isExist) return isExist.id;

        const newKeyword = await this.database.keyword.create({
          data: {
            name: keyword,
          },
        });

        return newKeyword.id;
      })
    );

    const post = await this.database.post.create({
      data: {
        ...rest,
        tags: {
          createMany: {
            data: [...tags.map((tag) => ({ tagId: tag }))],
          },
        },
        keywords: {
          createMany: {
            data: [...kewordIds.map((keywordId) => ({ keywordId }))],
          },
        },
      },
    });

    return post.id;
  }

  async updatePost(id: string, props: UpdatePostDTO) {
    const post = await this.findPost(id);

    let updateArgs: Prisma.PostUpdateArgs = {
      where: {
        id: post.id,
      },
      data: {
        title: props.title,
        thumbnail: props.thumbnail,
        description: props.description,
        content: props.content,
      },
    };

    if (props.tags) {
      updateArgs = {
        where: {
          id: post.id,
        },
        data: {
          ...updateArgs.data,
          tags: {
            deleteMany: {},
            createMany: {
              data: [...props.tags.map((tag) => ({ tagId: tag }))],
            },
          },
        },
      };
    }

    await this.database.post.update(updateArgs);
  }

  async deletePost(id: string) {
    const post = await this.findPost(id);

    await this.database.post.delete({
      where: {
        id: post.id,
      },
    });
  }
}
