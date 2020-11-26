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
import { ProjectDto } from '../project/dto/project.dto';
import { StoryDto } from './dto/story.dto';
import { StoryType } from '../constants/stroyType';

@Injectable()
export class StoryService {

    constructor(@InjectModel('Story') private storyModel: Model<Story>, @InjectModel('Project') private projectModel: Model<Project>) { }

    async findAllStories(): Promise<StoryDto[]> {
        return await this.storyModel.find().populate('project').exec();
    }

    async findStoriesByProjectId(projectId: string): Promise<StoryDto[]> {
        try {
            const existingProject: Project = await this.projectModel.findById(projectId).exec();
            if (!existingProject) {
                throw new NotFoundException(`No Project found with the id ${projectId}`);
            }
            return await this.storyModel.find({ project: existingProject._id }).populate('project').exec();
        }
        catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async createStory(incomingStory: StoryDto): Promise<StoryDto> {
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

    async updateStory(storyId: string, incomingStory: StoryDto): Promise<StoryDto> {
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
            existingStory.status = incomingStory.status;
            existingStory.critical = incomingStory.critical;
            existingStory.technology = incomingStory.technology;
            existingStory.type = incomingStory.type;
            existingStory.project = existingProject;

            let updatedStory = await existingStory.save();
            updatedStory.project = existingProject;
            return updatedStory;

            // return existingStory.save();
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async deleteStory(storyId: string) {
        const existingStory: StoryDto = await this.storyModel.findById(storyId).exec();
        if (!existingStory) {
            throw new NotFoundException(`No Story found with the id ${storyId}`);
        }
        await this.storyModel.deleteOne({ _id: storyId }).exec();
    }

    async deleteStoriesByProjectId(projectId: string, existingProject: Project) {
        try {
            await this.storyModel.deleteMany({ project: existingProject._id }).exec();
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }
}
