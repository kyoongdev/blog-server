import bcrypt from 'bcrypt';
import { Property } from 'kyoongdev-nestjs';
interface Props {
  userId?: string;
  name?: string;
  socialId?: string;
  password?: string;
}

export class CreateUserDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '아이디' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '비밀번호' } })
  password?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '소셜 id' } })
  socialId?: string;

  constructor(props?: Props) {
    if (props) {
      this.userId = props.userId;
      this.password = props.password;
      this.name = props.name;
      this.socialId = props.socialId;
    }
  }

  async hashPassword(salt: number) {
    this.password = await bcrypt.hash(this.password, salt);
  }
}
