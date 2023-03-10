import { User } from '@prisma/client';
export declare class UserDTO {
    id: string;
    userId?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    constructor(props: Partial<User>);
}
