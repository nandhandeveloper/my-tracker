import { StoryTechnology } from './../constants/stroyTechnology';
import { StoryCritical } from './../constants/stroyCritical';
import { StoryStatus } from './../constants/stroyStatus';
import { ThrowExeptionHandler } from './../util/throwExecptionHandler';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Story, StorySchema } from './story.model';
import { Project, ProjectSchema } from '../project/project.model';
import { ProjectDTO } from '../project/projectDTO';
import { storyDTO } from './storyDTO';
import { StoryType } from '../constants/stroyType';



@Injectable()
export class StoryService {

    constructor(@InjectModel('Story') private storyModel: Model<Story>, @InjectModel('Project') private projectModel: Model<Project>) { }

    async findAllStories(): Promise<storyDTO[]> {
        return await this.storyModel.find().populate('project').exec();
    }

    async findStoriesByProjectId(projectId: string): Promise<storyDTO[]> {
        try {
            const existingProject: Project = await this.projectModel.findById(projectId).exec();
            if (!existingProject) {
                throw new NotFoundException(`No Project found with the id ${projectId}`);
            }
            return  await this.storyModel.find({project: existingProject._id}).populate('project').exec();          
        }
        catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async createStory(incomingStory: storyDTO): Promise<storyDTO> {
        try {
            const { project: { _id } } = incomingStory;
            const existingProject: Project = await this.projectModel.findById(_id).exec();
            if (!existingProject) {
                throw new NotFoundException(`No Project found with the id ${_id}`);
            }
            const newStory = new this.storyModel({ ...incomingStory, project: { ...existingProject } });
            let persistedStory = await newStory.save();
            persistedStory.project = existingProject;
            return persistedStory;
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async updateStory(storyId: string, incomingStory: storyDTO): Promise<storyDTO> {
        try {
            const { project: { _id }, _id: storyId } = incomingStory;
            const existingProject: Project = await this.projectModel.findById(_id).exec();
            if (!existingProject) {
                throw new NotFoundException(`No Project found with the id ${_id}`);
            }
            const existingStory = await this.storyModel.findById(storyId).exec();
            if (!existingStory) {
                throw new NotFoundException(`No Story found with the id ${storyId}`);
            }

            existingStory.content = incomingStory.content;
            existingStory.status = incomingStory.status as StoryStatus;
            existingStory.critical = incomingStory.critical as StoryCritical;
            existingStory.technology = incomingStory.technology as StoryTechnology;
            existingStory.type = incomingStory.type as StoryType;
            existingStory.project = existingProject;

            return existingStory.save();
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async deleteStory(storyId: string) {
        const existingStory: storyDTO = await this.storyModel.findById(storyId).exec();
        if (!existingStory) {
            throw new NotFoundException(`No Story found with the id ${storyId}`);
        }
        await this.storyModel.deleteOne({ _id: storyId }).exec();
    }

    async deleteStoriesByProjectId(projectId: string, existingProject: Project) {
        try {
            await this.storyModel.deleteMany({project: existingProject._id}).exec();
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

}
