import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [PrismaModule],
})
export class GlobalModule {}
