import type { Post } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

type PostsDTOProps = Partial<Post> & {
  tags: string[];
};

export class PostsDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string' } })
  description: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: string;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  tags: string[];

  constructor(props: PostsDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
    this.description = props.description;
    this.createdAt = `${props.createdAt}`;
    this.tags = props.tags;
  }
}
