import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          let message = err.message
            ? Array.isArray(err.message)
              ? err.message.join(',')
              : err.message
            : 'Internal Server Error';

          if (message === 'Internal Server Error' && err.stack) {
            message = err.stack;
          }
          if (err instanceof InternalServerErrorException) {
            return new InternalServerErrorException(message);
          }
          throw err;
        })
      )
    );
  }
}
