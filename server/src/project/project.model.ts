import {Schema, Document} from 'mongoose';
import { ProjectStatus } from '../constants/projectStatus';

export const ProjectSchema = new Schema({
    name: { type: String, required: true },
    status: {type: String, enum:[ProjectStatus.ACTIVE, ProjectStatus.INACTIVE, ProjectStatus.ONHOLD], required: true },
    isChoosen: { type: Boolean, required: true },
}, {timestamps: true});


export interface Project extends Document {
    name: string;
    status: ProjectStatus;
    isChoosen: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}