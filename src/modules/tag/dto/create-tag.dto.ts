import { Property } from 'kyoongdev-nestjs';

export class CreateTagDTO {
  @Property({ apiProperty: { type: 'string' } })
  name: string;

  constructor(props?: string) {
    this.name = props;
  }
}
