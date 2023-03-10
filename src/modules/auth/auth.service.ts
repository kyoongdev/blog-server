import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly database: PrismaService) {}

  async login(props: LoginDTO) {
    const { userId, password } = props;
  }

  async register(props: RegisterDTO) {
    const { name, password, userId } = props;
  }
}
