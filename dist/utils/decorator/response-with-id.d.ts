export declare const RESPONSE_WITH_ID: unique symbol;
export declare const ReflectTarget: {
    Controller: string;
};
export declare function ResponseWithId(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
export declare function ResponseWithIdController(target: Object): void;
