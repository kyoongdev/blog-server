import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { TagService } from 'modules/tag/tag.service';
import { CreateProjectDTO, ProjectDTO, UpdateProjectDTO } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly database: PrismaService, private readonly tagService: TagService) {}

  async findProject(id: string) {
    const project = await this.database.project.findUnique({
      where: {
        id,
      },
    });
    if (!project) throw new NotFoundException('프로젝트를 찾을 수 없습니다.');

    return project;
  }

  async findAllProjects() {
    const projects = await this.database.project.findMany({
      include: {
        roles: {
          select: {
            tag: true,
          },
        },
        skills: {
          select: {
            tag: true,
          },
        },
      },
    });

    return projects.map((project) => {
      return new ProjectDTO({
        ...project,
        roles: project.roles.map(({ tag }) => tag.name),
        skills: project.skills.map(({ tag }) => tag.name),
      });
    });
  }

  async createProject(props: CreateProjectDTO) {
    const { skills, roles, ...rest } = props;

    const skillIds = await Promise.all(skills.map((skill) => this.tagService.createOrFindTag(skill)));
    const rolesIds = await Promise.all(roles.map((role) => this.tagService.createOrFindTag(role)));

    const project = await this.database.project.create({
      data: {
        ...rest,
        skills: {
          createMany: {
            data: skillIds.map((id) => ({ tagId: id })),
          },
        },
        roles: {
          createMany: {
            data: rolesIds.map((id) => ({ tagId: id })),
          },
        },
      },
    });
    return project.id;
  }

  async updateProject(id: string, props: UpdateProjectDTO) {
    const { roles, skills, ...rest } = props;
    const project = await this.findProject(id);

    let updateArgs: Prisma.ProjectUpdateArgs = {
      where: {
        id: project.id,
      },
      data: {
        ...rest,
      },
    };

    if (roles) {
      const rolesIds = await Promise.all(roles.map((role) => this.tagService.createOrFindTag(role)));

      updateArgs = {
        where: updateArgs.where,
        data: {
          ...updateArgs.data,
          roles: {
            deleteMany: {},
            createMany: {
              data: rolesIds.map((id) => ({ tagId: id })),
            },
          },
        },
      };
    }

    if (skills) {
      const skillIds = await Promise.all(skills.map((skill) => this.tagService.createOrFindTag(skill)));

      updateArgs = {
        where: updateArgs.where,
        data: {
          ...updateArgs.data,
          skills: {
            deleteMany: {},
            createMany: {
              data: skillIds.map((id) => ({ tagId: id })),
            },
          },
        },
      };
    }
    await this.database.project.update(updateArgs);
  }

  async deleteProject(id: string) {
    const project = await this.findProject(id);
    await this.database.project.delete({
      where: {
        id: project.id,
      },
    });
  }
}
