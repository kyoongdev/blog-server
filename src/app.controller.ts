import { Controller, Get, Response } from '@nestjs/common';
import type { Response as ResponseType } from 'express';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  default(@Response() response: ResponseType): void {
    response.redirect('/api-docs');
  }

  @Get('/health')
  healthCheck(@Response() response: ResponseType) {
    response.status(200).json({ status: 'HEALTHY' });
  }
}
