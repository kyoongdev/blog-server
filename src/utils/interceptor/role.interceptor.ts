import { CallHandler, ExecutionContext, mixin, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const RoleInterceptorAPI = (role?: keyof typeof Role, nullable?: boolean) => {
  class RoleInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest();

      if (!req.user && !nullable) throw new UnauthorizedException('로그인을 진행해주세요.');

      if (role && !nullable) {
        if (role === Role.ADMIN) {
          if (req.user.userType !== Role.ADMIN) throw new UnauthorizedException('권한이 없습니다.');
        } else {
          if (req.user.userType !== Role.USER || req.user.userType !== Role.ADMIN)
            throw new UnauthorizedException('권한이 없습니다.');
        }
      }

      return next.handle();
    }
  }
  return mixin<RoleInterceptor>(RoleInterceptor);
};
