import type { Post } from '@prisma/client';
type PostDTOProps = Partial<Post> & {
    tags: string[];
    keywords: string[];
};
export declare class PostDTO {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    keywords: string[];
    constructor(props: PostDTOProps);
}
export {};
