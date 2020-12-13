export enum ProjectStatus {
    ACTIVE = 'Active',
    INACTIVE = 'InActive',
    ONHOLD = 'OnHold',
}

export interface AddProject {
    name: string;
    status: ProjectStatus;
    isChoosen: boolean;
}

export interface Project extends AddProject {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
