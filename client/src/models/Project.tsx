
export enum ProjectStatus {
    ACTIVE = 'Active',
    INACTIVE = 'InActive',
    ONHOLD = 'OnHold',
}

export interface AddProject {
    name: string,
    status: ProjectStatus,
}

export interface Project extends AddProject {
    _id: string,
    isChoosen: boolean,
    createdAt: Date,
    updatedAt: Date,
}

