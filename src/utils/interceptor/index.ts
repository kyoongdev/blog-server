import { Type } from '@nestjs/common';
import { ErrorsInterceptor } from './error.interceptor';

export * from './data.interceptor';
export * from './response-with-id.interceptor';
export * from './user-cookie.interceptor';

export const Interceptors: Type<any>[] = [ErrorsInterceptor];
