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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const dto_1 = require("./dto");
let PostService = class PostService {
    constructor(database) {
        this.database = database;
    }
    async findPost(id) {
        const { tags, keywords, ...rest } = await this.database.post.findUnique({
            where: {
                id,
            },
            include: {
                tags: {
                    include: {
                        tag: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                keywords: {
                    include: {
                        keyword: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return new dto_1.PostDTO({
            ...rest,
            tags: tags.map(({ tag }) => tag.name),
            keywords: keywords.map(({ keyword }) => keyword.name),
        });
    }
    async findPosts(paging, args = {}) {
        const { take, skip } = paging.getSkipTake();
        const count = await this.database.post.count({
            where: { ...args.where },
        });
        const data = await this.database.post.findMany({
            where: {
                ...args.where,
            },
            include: {
                tags: {
                    include: {
                        tag: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            skip,
            take,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const rows = data.map((post) => {
            const { tags, ...rest } = post;
            return new dto_1.PostsDTO({ ...rest, tags: tags.map((tag) => tag.tag.name) });
        });
        return new kyoongdev_nestjs_1.PaginationDTO(rows, { count, paging });
    }
    async createPost(props) {
        const { tags, keywords, ...rest } = props;
        const keywordIds = await Promise.all(keywords.map(async (keyword) => {
            const isExist = await this.database.keyword.findFirst({
                where: {
                    name: keyword,
                },
            });
            if (isExist)
                return isExist.id;
            const newKeyword = await this.database.keyword.create({
                data: {
                    name: keyword,
                },
            });
            return newKeyword.id;
        }));
        const post = await this.database.post.create({
            data: {
                ...rest,
                tags: {
                    createMany: {
                        data: tags.map((tag) => ({ tagId: tag })),
                    },
                },
                keywords: {
                    createMany: {
                        data: keywordIds.map((keywordId) => ({ keywordId })),
                    },
                },
            },
        });
        return post.id;
    }
    async updatePost(id, props) {
        const post = await this.findPost(id);
        let updateArgs = {
            where: {
                id: post.id,
            },
            data: {
                title: props.title,
                thumbnail: props.thumbnail,
                description: props.description,
                content: props.content,
            },
        };
        if (props.tags) {
            updateArgs = {
                where: {
                    id: post.id,
                },
                data: {
                    ...updateArgs.data,
                    tags: {
                        deleteMany: {},
                        createMany: {
                            data: [...props.tags.map((tag) => ({ tagId: tag }))],
                        },
                    },
                },
            };
        }
        if (props.keywords) {
            const keywordIds = await Promise.all(props.keywords.map(async (keyword) => {
                const isExist = await this.database.keyword.findFirst({
                    where: {
                        name: keyword,
                    },
                });
                if (isExist)
                    return isExist.id;
                const newKeyword = await this.database.keyword.create({
                    data: {
                        name: keyword,
                    },
                });
                return newKeyword.id;
            }));
            updateArgs = {
                where: {
                    id: post.id,
                },
                data: {
                    ...updateArgs.data,
                    keywords: {
                        deleteMany: {},
                        createMany: {
                            data: keywordIds.map((keyword) => ({ keywordId: keyword })),
                        },
                    },
                },
            };
        }
        await this.database.post.update(updateArgs);
    }
    async deletePost(id) {
        const post = await this.findPost(id);
        await this.database.post.delete({
            where: {
                id: post.id,
            },
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map