import { PagingDTO } from 'kyoongdev-nestjs';
import { CreatePostDTO, PostDTO, PostsDTO, UpdatePostDTO } from './dto';
import { FindPostsQuery } from './dto/query';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAllPosts(): Promise<{
        id: string;
    }[]>;
    findPosts(paging: PagingDTO, query: FindPostsQuery): Promise<import("kyoongdev-nestjs").PaginationDTO<PostsDTO>>;
    findPost(id: string, cookie?: string): Promise<PostDTO>;
    increasePostViewCount(id: string): Promise<void>;
    createPost(body: CreatePostDTO): Promise<string>;
    updatePost(id: string, body: UpdatePostDTO): Promise<void>;
    deletePost(id: string): Promise<void>;
}
