import { User, UserType } from '@prisma/client';
export declare class UserDetailDTO {
    id: string;
    userId?: string;
    name?: string;
    password?: string;
    userType: UserType;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(props: Partial<User>);
    comparePassword(password: string): Promise<boolean>;
}
