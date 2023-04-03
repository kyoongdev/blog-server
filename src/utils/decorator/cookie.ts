import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookie = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  console.log(`COOKIES`, req.cookies);
  return req.cookies['f' + req.path];
});
