import { Property } from 'kyoongdev-nestjs';

export class UpdatePostDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  thumbnail?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true } })
  tags?: string[];
}
