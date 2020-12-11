
export enum ProjectStatus {
    ACTIVE = 'Active',
    INACTIVE = 'InActive',
    ONHOLD = 'Onhold',
}

export interface Project {
    _id: string,
    name: string,
    status: ProjectStatus,
    isChoosen: boolean,
    createdAt: Date,
    updatedAt: Date,
}