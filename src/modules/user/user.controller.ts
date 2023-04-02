import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { ResponseWithIdInterceptor } from 'utils';
import { ReqUser, ResponseWithId, ResponseWithIdController } from 'utils/decorator';
import { JwtAuthGuard } from 'utils/guards';
import { Role, RoleInterceptorAPI } from 'utils/interceptor/role.interceptor';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { UserService } from './user.service';

@ApiTags('유저')
@Controller('users')
@ResponseWithIdController
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER, true))
  @RequestApi({})
  @ResponseApi({
    type: UserDTO,
  })
  async getMe(@ReqUser() user: User) {
    return new UserDTO(await this.userService.findUser(user.id));
  }

  @Get(':id/detail')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({
    type: UserDTO,
  })
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findUser(id);
    return new UserDTO(user);
  }

  @Get()
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @ResponseWithId
  @RequestApi({
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: UserDTO,
    isPaging: true,
  })
  async findUsers(@Paging() paging: PagingDTO) {
    return await this.userService.findUsers(paging);
  }

  @Post()
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    body: {
      type: CreateUserDTO,
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Patch(':id')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: UpdateUserDTO,
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    await this.userService.updateUser(id, body);
  }

  @Patch()
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.USER))
  @RequestApi({
    body: {
      type: UpdateUserDTO,
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async updateMyInfo(@ReqUser() user: User, @Body() body: UpdateUserDTO) {
    await this.userService.updateUser(user.id, body);
  }

  @Delete(':id')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }
}
