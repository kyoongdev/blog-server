"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const tag_service_1 = require("../tag/tag.service");
const dto_1 = require("./dto");
let ProjectService = class ProjectService {
    constructor(database, tagService) {
        this.database = database;
        this.tagService = tagService;
    }
    async findProject(id) {
        const project = await this.database.project.findUnique({
            where: {
                id,
            },
        });
        if (!project)
            throw new common_1.NotFoundException('프로젝트를 찾을 수 없습니다.');
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
            return new dto_1.ProjectDTO({
                ...project,
                roles: project.roles.map(({ tag }) => tag.name),
                skills: project.skills.map(({ tag }) => tag.name),
            });
        });
    }
    async createProject(props) {
        const { skills, roles, ...rest } = props;
        const skillIds = await Promise.all(skills.map(this.tagService.createOrFindTag));
        const rolesIds = await Promise.all(roles.map(this.tagService.createOrFindTag));
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
    async updateProject(id, props) {
        const { roles, skills, ...rest } = props;
        const project = await this.findProject(id);
        let updateArgs = {
            where: {
                id: project.id,
            },
            data: {
                ...rest,
            },
        };
        if (roles) {
            const rolesIds = await Promise.all(roles.map(async (role) => await this.tagService.createOrFindTag(role)));
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
            const skillIds = await Promise.all(skills.map(async (skill) => await this.tagService.createOrFindTag(skill)));
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
    async deleteProject(id) {
        const project = await this.findProject(id);
        await this.database.project.delete({
            where: {
                id: project.id,
            },
        });
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, tag_service_1.TagService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map