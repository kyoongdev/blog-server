import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateUserDTO, UpdateUserDTO, UserDetailDTO } from './dto';
import { UserException } from './user.exception';

@Injectable()
export class UserService {
  constructor(private readonly database: PrismaService, private readonly exception: UserException) {}

  async findUser(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });
    this.exception.userNotFound(user);

    return new UserDetailDTO(user);
  }

  async findUserByUserId(userId: string) {
    const user = await this.database.user.findUnique({
      where: {
        userId,
      },
    });

    this.exception.userNotFound(user);

    return new UserDetailDTO(user);
  }

  async findUserBySocialId(socialId: string) {
    const user = await this.database.user.findUnique({
      where: {
        socialId,
      },
    });

    this.exception.userNotFound(user);
  }

  async createUser(props: CreateUserDTO) {}

  async updateUser(id: string, props: UpdateUserDTO) {}

  async deleteUser(id: string) {}
}
