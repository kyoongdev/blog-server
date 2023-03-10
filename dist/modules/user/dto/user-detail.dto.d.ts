import { User } from '@prisma/client';
export declare class UserDetailDTO {
    id: string;
    userId?: string;
    name?: string;
    password?: string;
    socialId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(props: Partial<User>);
    comparePassword(password: string): Promise<boolean>;
}
