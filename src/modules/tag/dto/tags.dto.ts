import type { Tags } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export class TagsDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  constructor(props: Partial<Tags>) {
    this.id = props.id;
    this.name = props.name;
  }
}
