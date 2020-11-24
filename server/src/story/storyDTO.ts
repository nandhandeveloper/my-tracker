import { ProjectDTO } from './../project/projectDTO';

export interface storyDTO {
    _id?: string;
    content: string;
    project: ProjectDTO;
    critical: string;
    technology: string;
    type: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}