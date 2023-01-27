import { PagingDTO, Property } from 'kyoongdev-nestjs';

export class FindPostsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true } })
  tags?: string[];
}
