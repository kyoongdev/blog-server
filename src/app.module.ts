import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Modules } from 'modules';
import { Filters, Interceptors } from 'utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const providers = [...Interceptors, ...Filters];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...Modules,
  ],
  controllers: [AppController],
  providers: [AppService, ...providers],
})
export class AppModule {}
