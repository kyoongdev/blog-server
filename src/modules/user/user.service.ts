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
    return new UserDetailDTO(user);
  }

  async createUser(props: CreateUserDTO) {
    const user = await this.database.user.create({
      data: {
        ...props,
      },
    });

    return user.id;
  }

  async updateUser(id: string, props: UpdateUserDTO) {
    const user = await this.findUser(id);

    await this.database.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...props,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.findUser(id);

    await this.database.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
