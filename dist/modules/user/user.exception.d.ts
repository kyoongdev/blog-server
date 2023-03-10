import { User } from '@prisma/client';
export declare class UserException {
    userNotFound(user: User): void;
}
