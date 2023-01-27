import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateTagDTO, TagsDTO } from './dto';

@Injectable()
export class TagService {
  constructor(private readonly database: PrismaService) {}

  async findTag(id: string) {
    const tag = await this.database.tags.findUnique({
      where: {
        id,
      },
    });

    if (!tag) throw new NotFoundException('태그를 찾을 수 없습니다.');

    return new TagsDTO(tag);
  }

  async findTags() {
    const tags = await this.database.tags.findMany({});

    return tags.map((tag) => new TagsDTO(tag));
  }

  async findTagsByPost(postId: string) {
    const tags = await this.database.tags.findMany({
      where: {
        posts: {
          some: {
            postId,
          },
        },
      },
    });

    return tags.map((tag) => new TagsDTO(tag));
  }

  async createTags(props: CreateTagDTO) {
    const tag = await this.database.tags.create({
      data: {
        name: props.name,
      },
    });

    return tag.id;
  }

  async deleteTag(id: string) {
    const tag = await this.findTag(id);

    await this.database.tags.delete({
      where: {
        id: tag.id,
      },
    });
  }
}
