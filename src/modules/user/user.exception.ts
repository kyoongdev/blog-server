import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserException {
  public userNotFound(user: User) {
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
  }
}
