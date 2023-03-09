import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { getClientIp } from 'request-ip';
import { map, Observable, tap } from 'rxjs';
export class UserCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        response.cookie('f' + request.url, getClientIp(request), {
          maxAge: 1200000,
          sameSite: 'none',
        });
      })
    );
  }
}
