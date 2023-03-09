import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { PrismaService } from 'database/prisma.service';
import session from 'express-session';
import { PaginationMiddleware } from 'kyoongdev-nestjs';
import { winstonLogger } from 'log';

import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  app.use(cookieParser());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kyoongdev Village API')
    .setDescription('Kyoongdev Village - 블로그 전용 api 입니다.')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token'
    )
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.use(PaginationMiddleware);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
    })
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8000, () => {
    console.info('🔹Server is running on port 8000🔹!!');
  });
})();
