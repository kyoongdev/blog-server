import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqUser = createParamDecorator(async <T extends object>(data: any, ctx: ExecutionContext): Promise<T> => {
  const request = await ctx.switchToHttp().getRequest();

  return request.user as T;
});
