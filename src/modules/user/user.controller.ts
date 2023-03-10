import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Paging, PagingDTO, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { ResponseWithIdInterceptor } from 'utils';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { UserService } from './user.service';

@ApiTags('유저')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
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
  @UseInterceptors(ResponseWithIdInterceptor)
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

  @Delete(':id')
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
