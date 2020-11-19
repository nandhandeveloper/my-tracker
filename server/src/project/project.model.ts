import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    isSelected: { type: Boolean, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});

export interface Project extends mongoose.Document {
    id?: string;
    name: string;
    status: string;
    isChoosen: boolean;
    createdAt: string;
    updatedAt: string;
}