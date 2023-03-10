import { ClassProvider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './error.filter';

export const Filters: ClassProvider<any>[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];
