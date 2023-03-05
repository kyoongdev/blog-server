import { Project } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface ProjectDTOProps extends Project {
  skills: string[];
  roles: string[];
}

export class ProjectDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  title: string;

  @Property({ apiProperty: { type: 'string' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  link?: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  startDate: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  endDate: Date;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  skills: string[];

  @Property({ apiProperty: { type: 'string', isArray: true } })
  roles: string[];

  constructor(props: ProjectDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.thumbnail = props.thumbnail;
    this.content = props.content;
    this.link = props.link;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.skills = props.skills;
    this.roles = props.roles;
  }
}
