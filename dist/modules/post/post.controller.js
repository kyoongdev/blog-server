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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../common");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const utils_1 = require("../../utils");
const decorator_1 = require("../../utils/decorator");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async findAllPosts() {
        return await this.postService.findAllPosts();
    }
    async findPosts(paging, query) {
        return await this.postService.findPosts(paging, {
            where: {
                ...(query.tags && {
                    tags: {
                        some: {
                            OR: query.tags.map((tag) => ({ tag: { id: tag } })),
                        },
                    },
                }),
            },
        });
    }
    async findPost(id, cookie) {
        if (!cookie) {
            this.increasePostViewCount(id);
        }
        return await this.postService.findPost(id);
    }
    async increasePostViewCount(id) {
        await this.postService.increaseViewCount(id);
    }
    async createPost(body) {
        return await this.postService.createPost(body);
    }
    async updatePost(id, body) {
        await this.postService.updatePost(id, body);
    }
    async deletePost(id) {
        await this.postService.deletePost(id);
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAllPosts", null);
__decorate([
    (0, common_1.Get)(),
    (0, kyoongdev_nestjs_1.RequestApi)({}),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.PostsDTO,
        isPaging: true,
    }),
    __param(0, (0, kyoongdev_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kyoongdev_nestjs_1.PagingDTO, query_1.FindPostsQuery]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPosts", null);
__decorate([
    (0, common_1.Get)('/:id/detail'),
    (0, common_1.UseInterceptors)(utils_1.UserCookieInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.PostDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.Cookie)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPost", null);
__decorate([
    (0, common_1.Post)('/:id/viewCount'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "increasePostViewCount", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.CreatePostDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePostDTO]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
        body: {
            type: dto_1.UpdatePostDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePostDTO]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, kyoongdev_nestjs_1.RequestApi)({
        params: {
            name: 'id',
            type: 'string',
            required: true,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)('포스트'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map