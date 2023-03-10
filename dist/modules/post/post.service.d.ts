import type { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PaginationDTO, PagingDTO } from 'kyoongdev-nestjs';
import { CreatePostDTO, PostDTO, PostsDTO, UpdatePostDTO } from './dto';
export declare class PostService {
    private readonly database;
    constructor(database: PrismaService);
    findAllPosts(): Promise<{
        id: string;
    }[]>;
    findPost(id: string): Promise<PostDTO>;
    findPosts(paging: PagingDTO, args?: Prisma.PostFindManyArgs): Promise<PaginationDTO<PostsDTO>>;
    createPost(props: CreatePostDTO): Promise<string>;
    increaseViewCount(id: string): Promise<void>;
    updatePost(id: string, props: UpdatePostDTO): Promise<void>;
    deletePost(id: string): Promise<void>;
}
