import { Project } from '@prisma/client';
interface ProjectDTOProps extends Project {
    skills: string[];
    roles: string[];
}
export declare class ProjectDTO {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    startDate: Date;
    endDate: Date;
    skills: string[];
    roles: string[];
    constructor(props: ProjectDTOProps);
}
export {};
