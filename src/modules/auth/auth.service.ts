import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly database: PrismaService) {}

  async login() {}

  async register() {}
}
