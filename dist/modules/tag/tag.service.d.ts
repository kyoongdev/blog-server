import { PrismaService } from 'database/prisma.service';
import { CreateTagDTO, TagsDTO } from './dto';
export declare class TagService {
    private readonly database;
    constructor(database: PrismaService);
    findTag(id: string): Promise<TagsDTO>;
    findTags(): Promise<TagsDTO[]>;
    findTagsByPost(postId: string): Promise<TagsDTO[]>;
    createTags(props: CreateTagDTO): Promise<string>;
    deleteTag(id: string): Promise<void>;
    createOrFindTag(name: string): Promise<string>;
}
