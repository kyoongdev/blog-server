import type { Post } from '@prisma/client';
type PostsDTOProps = Partial<Post> & {
    tags: string[];
};
export declare class PostsDTO {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    createdAt: string;
    tags: string[];
    constructor(props: PostsDTOProps);
}
export {};
