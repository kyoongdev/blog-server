import { Property } from 'kyoongdev-nestjs';
export class SocialDTO {
  @Property({ apiProperty: { type: 'string', required: true, description: '이메일' } })
  email: string;

  @Property({ apiProperty: { type: 'string', required: true, description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', required: true, description: '카카오 토큰' } })
  token: string;
}
