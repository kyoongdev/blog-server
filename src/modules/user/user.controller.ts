import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('유저')
@Controller('users')
export class UserController {}
