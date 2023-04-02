interface Props {
    userId?: string;
    name?: string;
    password?: string;
}
export declare class CreateUserDTO {
    userId?: string;
    password?: string;
    name?: string;
    constructor(props?: Props);
    hashPassword(salt: number): Promise<void>;
}
export {};
