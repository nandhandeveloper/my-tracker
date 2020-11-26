// import { Project } from './../project/project.model';
import { StoryTechnology } from './../constants/stroyTechnology';
import { Project } from '../project/project.model';

import { Schema, Document } from 'mongoose';
import { StoryStatus } from './../constants/stroyStatus';
import { StoryCritical } from './../constants/stroyCritical';
import { StoryType } from '../constants/stroyType';

export const StorySchema = new Schema({
    content: { type: String, required: true },
    critical: { type: String,enum:[StoryCritical.HIGH,StoryCritical.LOW,StoryCritical.MEDIUM] , required: true },
    technology: { type: String, enum: [StoryTechnology.FRONTEND,StoryTechnology.BACKEND,StoryTechnology.DATABASE,StoryTechnology.DEVOPS,StoryTechnology.OTHER], required: true },
    type: { type: String, enum: [StoryType.FEATURE, StoryType.FIX, StoryType.STYLE, StoryType.CHORE, StoryType.TEST, StoryType.REFACTOR, StoryType.DOCS], required: true },
    status: { type: String, enum:[StoryStatus.INACTIVE, StoryStatus.ACTIVE, StoryStatus.COMPLETE], required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }

}, { timestamps: true });

export interface Story extends Document {
    content: string;
    status: StoryStatus;
    critical: StoryCritical;
    technology: StoryTechnology;
    type: StoryType;
    project: Project;
    createdAt?: Date;
    updatedAt?: Date;
}