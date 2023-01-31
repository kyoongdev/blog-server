import type { Post } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

type PostDTOProps = Partial<Post> & {
  tags: string[];
  keywords: string[];
};

export class PostDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string' } })
  description: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: string;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  tags: string[];

  @Property({ apiProperty: { type: 'string', isArray: true } })
  keywords: string[];

  constructor(props: PostDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
    this.description = props.description;
    this.content = props.content;
    this.createdAt = `${props.createdAt}`;
    this.updatedAt = `${props.updatedAt}`;
    this.tags = props.tags;
    this.keywords = props.keywords;
  }
}
