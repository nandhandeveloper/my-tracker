import { ProjectStatus } from './../constants/projectStatus';

export interface ProjectDTO {
    _id?: string;
    name: string;
    status: ProjectStatus;
    isChoosen: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}