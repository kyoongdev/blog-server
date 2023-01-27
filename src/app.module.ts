import { ClassProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Modules } from 'modules';
import { Interceptors } from 'utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const InterceptorProviders: ClassProvider<any>[] = Interceptors.map((interceptor) => ({
  provide: APP_INTERCEPTOR,
  useClass: interceptor,
}));
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...Modules,
  ],
  controllers: [AppController],
  providers: [AppService, ...InterceptorProviders],
})
export class AppModule {}
