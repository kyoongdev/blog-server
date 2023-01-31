import { Property } from 'kyoongdev-nestjs';

export class CreatePostDTO {
  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string' } })
  description: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  tags: string[];

  @Property({ apiProperty: { type: 'string', isArray: true } })
  keywords: string[];
}
