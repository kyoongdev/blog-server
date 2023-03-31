import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { Jsonwebtoken } from 'utils/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, Jsonwebtoken],
})
export class AuthModule {}
