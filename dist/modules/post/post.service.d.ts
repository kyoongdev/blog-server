import type { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { CreatePostDTO, PostDTO, PostsDTO, UpdatePostDTO } from './dto';
export declare class PostService {
    private readonly database;
    constructor(database: PrismaService);
    findPost(id: string): Promise<PostDTO>;
    findPosts(paging: PagingDTO, args?: Prisma.PostFindManyArgs): Promise<PaginationDTO<PostsDTO>>;
    createPost(props: CreatePostDTO): Promise<string>;
    updatePost(id: string, props: UpdatePostDTO): Promise<void>;
    deletePost(id: string): Promise<void>;
}
