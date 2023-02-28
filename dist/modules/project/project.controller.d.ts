import { CreateProjectDTO, ProjectDTO, UpdateProjectDTO } from './dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    getProjects(): Promise<ProjectDTO[]>;
    createProject(body: CreateProjectDTO): Promise<string>;
    updateProject(id: string, body: UpdateProjectDTO): Promise<void>;
    deleteProject(id: string): Promise<void>;
}
