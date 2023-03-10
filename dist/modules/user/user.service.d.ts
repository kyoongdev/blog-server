import { PrismaService } from 'database/prisma.service';
import { CreateUserDTO, UpdateUserDTO, UserDetailDTO } from './dto';
import { UserException } from './user.exception';
export declare class UserService {
    private readonly database;
    private readonly exception;
    constructor(database: PrismaService, exception: UserException);
    findUser(id: string): Promise<UserDetailDTO>;
    findUserByUserId(userId: string): Promise<UserDetailDTO>;
    findUserBySocialId(socialId: string): Promise<void>;
    createUser(props: CreateUserDTO): Promise<void>;
    updateUser(id: string, props: UpdateUserDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
