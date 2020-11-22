import {Schema, Document} from 'mongoose';

export const ProjectSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    isChoosen: { type: Boolean, required: true },
}, {timestamps: true});

export interface Project extends Document {
    id?: string;
    name: string;
    status: string;
    isChoosen: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}