import { Property } from 'kyoongdev-nestjs';

export class TokenDTO {
  @Property({ apiProperty: { type: 'string' } })
  accessToken: string;

  @Property({ apiProperty: { type: 'string' } })
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
