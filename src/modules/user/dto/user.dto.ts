import { User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export class UserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  createdAt?: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true } })
  updatedAt?: string;

  constructor(props: Partial<User>) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.createdAt = props.createdAt?.toISOString();
    this.updatedAt = props.updatedAt?.toISOString();
  }
}