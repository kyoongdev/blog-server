import { PagingDTO } from 'kyoongdev-nestjs';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUser(id: string): Promise<UserDTO>;
    findUsers(paging: PagingDTO): Promise<import("kyoongdev-nestjs").PaginationDTO<import(".prisma/client").User>>;
    createUser(body: CreateUserDTO): Promise<string>;
    updateUser(id: string, body: UpdateUserDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
