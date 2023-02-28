import { Property } from 'kyoongdev-nestjs';

export class UpdateProjectDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  thumbnail?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  startDate?: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  endDate?: Date;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true } })
  skills?: string[];

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true } })
  roles?: string[];
}
