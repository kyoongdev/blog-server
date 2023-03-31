import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export declare const RoleInterceptorAPI: (role?: keyof typeof Role, nullable?: boolean) => import("@nestjs/common").Type<{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}>;
