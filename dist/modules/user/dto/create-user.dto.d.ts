interface Props {
    userId?: string;
    name?: string;
    socialId?: string;
    password?: string;
}
export declare class CreateUserDTO {
    userId?: string;
    password?: string;
    name?: string;
    socialId?: string;
    constructor(props?: Props);
    hashPassword(salt: number): Promise<void>;
}
export {};
