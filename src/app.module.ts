import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { Modules } from 'modules';
import { Filters, Interceptors, ResponseWithIdRegister } from 'utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const providers = [...Interceptors, ...Filters, ResponseWithIdRegister];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...Modules,
    DiscoveryModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...providers],
})
export class AppModule {}
