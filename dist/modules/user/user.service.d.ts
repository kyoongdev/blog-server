import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { CreateUserDTO, UpdateUserDTO, UserDetailDTO } from './dto';
import { UserException } from './user.exception';
export declare class UserService {
    private readonly database;
    private readonly exception;
    private readonly configService;
    constructor(database: PrismaService, exception: UserException, configService: ConfigService);
    findUsers(paging: PagingDTO, args?: Prisma.UserFindManyArgs): Promise<PaginationDTO<import(".prisma/client").User>>;
    findUser(id: string): Promise<UserDetailDTO>;
    findUserByUserId(userId: string): Promise<UserDetailDTO>;
    checkUserByUserId(userId: string): Promise<import(".prisma/client").User>;
    createUser(props: CreateUserDTO): Promise<string>;
    updateUser(id: string, props: UpdateUserDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
