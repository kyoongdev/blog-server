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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
let TagService = class TagService {
    constructor(database) {
        this.database = database;
    }
    async findTag(id) {
        const tag = await this.database.tags.findUnique({
            where: {
                id,
            },
        });
        if (!tag)
            throw new common_1.NotFoundException('태그를 찾을 수 없습니다.');
        return new dto_1.TagsDTO(tag);
    }
    async findTags() {
        const tags = await this.database.tags.findMany({
            where: {
                NOT: [
                    {
                        projectRoles: {
                            some: {},
                        },
                    },
                    {
                        projectSkills: {
                            some: {},
                        },
                    },
                ],
            },
        });
        return tags.map((tag) => new dto_1.TagsDTO(tag));
    }
    async findTagsByPost(postId) {
        const tags = await this.database.tags.findMany({
            where: {
                posts: {
                    some: {
                        postId,
                    },
                },
            },
        });
        return tags.map((tag) => new dto_1.TagsDTO(tag));
    }
    async createTags(props) {
        const tag = await this.database.tags.create({
            data: {
                name: props.name,
            },
        });
        return tag.id;
    }
    async deleteTag(id) {
        const tag = await this.findTag(id);
        await this.database.tags.delete({
            where: {
                id: tag.id,
            },
        });
    }
    async createOrFindTag(name) {
        const tag = await this.database.tags.findFirst({
            where: {
                name,
            },
        });
        if (tag)
            return tag.id;
        const newTag = await this.database.tags.create({
            data: {
                name,
            },
        });
        return newTag.id;
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map