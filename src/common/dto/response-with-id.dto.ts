import { Property } from 'kyoongdev-nestjs';

export class ResponseWithIdDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;
}
