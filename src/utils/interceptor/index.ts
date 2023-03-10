import { ClassProvider } from '@nestjs/common';

export * from './data.interceptor';
export * from './response-with-id.interceptor';
export * from './user-cookie.interceptor';

export const Interceptors: ClassProvider<any>[] = [];
