import { Property } from 'kyoongdev-nestjs';

export class CreateProjectDTO {
  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  startDate: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  endDate: Date;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  skills: string[];

  @Property({ apiProperty: { type: 'string', isArray: true } })
  roles: string[];
}
