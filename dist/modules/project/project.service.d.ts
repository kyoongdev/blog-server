import { PrismaService } from 'database/prisma.service';
import { TagService } from 'modules/tag/tag.service';
import { CreateProjectDTO, ProjectDTO, UpdateProjectDTO } from './dto';
export declare class ProjectService {
    private readonly database;
    private readonly tagService;
    constructor(database: PrismaService, tagService: TagService);
    findProject(id: string): Promise<import(".prisma/client").Project>;
    findAllProjects(): Promise<ProjectDTO[]>;
    createProject(props: CreateProjectDTO): Promise<string>;
    updateProject(id: string, props: UpdateProjectDTO): Promise<void>;
    deleteProject(id: string): Promise<void>;
}
