import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserException } from './user.exception';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserException],
})
export class UserModule {}
