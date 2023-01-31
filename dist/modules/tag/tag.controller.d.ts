import { CreateTagDTO, TagsDTO } from './dto';
import { TagService } from './tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    getTags(): Promise<TagsDTO[]>;
    createTag(body: CreateTagDTO): Promise<string>;
    deleteTag(id: string): Promise<void>;
}
