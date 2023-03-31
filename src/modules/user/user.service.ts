import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { CreateUserDTO, UpdateUserDTO, UserDetailDTO } from './dto';
import { UserException } from './user.exception';

@Injectable()
export class UserService {
  constructor(private readonly database: PrismaService, private readonly exception: UserException) {}

  async findUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { take, skip } = paging.getSkipTake();
    const count = await this.database.user.count({
      where: args.where,
    });

    const users = await this.database.user.findMany({
      ...args,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new PaginationDTO(users, { count, paging });
  }

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

  async checkUserByUserId(userId: string) {
    const user = await this.database.user.findUnique({
      where: {
        userId,
      },
    });

    return user;
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
