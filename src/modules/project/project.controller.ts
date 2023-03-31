import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmptyResponseDTO, ResponseWithIdDTO } from 'common';
import { Auth, RequestApi, ResponseApi } from 'kyoongdev-nestjs';
import { ResponseWithIdInterceptor } from 'utils';
import { JwtAuthGuard } from 'utils/guards';
import { Role, RoleInterceptorAPI } from 'utils/interceptor/role.interceptor';
import { CreateProjectDTO, ProjectDTO, UpdateProjectDTO } from './dto';
import { ProjectService } from './project.service';

@ApiTags('프로젝트')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @RequestApi({})
  @ResponseApi({
    type: ProjectDTO,
    isArray: true,
  })
  async getProjects() {
    return await this.projectService.findAllProjects();
  }

  @Post()
  @Auth(JwtAuthGuard)
  @UseInterceptors(ResponseWithIdInterceptor, RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    body: {
      type: CreateProjectDTO,
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async createProject(@Body() body: CreateProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Patch('/:id')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI(Role.ADMIN))
  @RequestApi({
    params: {
      name: 'id',
      type: 'string',
      required: true,
    },
    body: {
      type: UpdateProjectDTO,
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async updateProject(@Param('id') id: string, @Body() body: UpdateProjectDTO) {
    await this.projectService.updateProject(id, body);
  }

  @Delete('/:id')
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
  async deleteProject(@Param('id') id: string) {
    await this.projectService.deleteProject(id);
  }
}
