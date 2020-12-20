import { Project } from './Project';

export enum StoryCritical {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export enum StoryTechnology {
    FRONTEND = 'Front end',
    BACKEND = 'Back end',
    DATABASE = 'Database',
    DEVOPS = 'DevOps',
    OTHER = 'Other',
}
export enum StoryType {
    FEATURE = 'Feature',
    CHORE = 'Chore',
    FIX = 'Fix',
    TEST = 'Test',
    REFACTOR = 'Refactor',
    STYLE = 'Style',
    DOCS = 'Docs',
}

export enum StoryStatus {
    ACTIVE = 'Active',
    INACTIVE = 'InActive',
    COMPLETE = 'Complete',
}

export interface AddStory {
    content: string;
    project: Project;
    critical: StoryCritical;
    technology: StoryTechnology;
    type: StoryType;
    status: StoryStatus;
}

export interface Story extends AddStory {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
