import { User } from '@prisma/client';
export declare class UserDTO {
    id: string;
    userId?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(props: Partial<User>);
}
