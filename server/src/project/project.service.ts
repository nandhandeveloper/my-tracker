import { Project } from './project.model';
import { ProjectDTO } from './ProjectDTO';

import { Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { ThrowExeptionHandler } from '../util/throwExecptionHandler';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private projectModel: Model<Project>) { }

     async createProject(incomingProject: ProjectDTO): Promise<ProjectDTO> {
        const { name } = incomingProject;
        try {
            const existingProject = await this.projectModel.findOne({ name }).exec();
            if (existingProject) {
                throw new UnprocessableEntityException(`Project with name ${name} already exists`);
            }
            const newProject = new this.projectModel({ ...incomingProject });
            return newProject.save();
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async findAllProjects(): Promise<ProjectDTO[]> {
        try {
            return await this.projectModel.find().exec();
        } catch (error) {
            ThrowExeptionHandler(error);
        }

    }

    async findProjectById(id: string): Promise<Project> {
        try {
            const existingProject = await this.projectModel.findById(id).exec();
            if (!existingProject) {
                throw new NotFoundException(`No Project found with the id ${id}`);
            }
            return existingProject;
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async updateProject(id: string, updateProject: ProjectDTO): Promise<ProjectDTO> {
        const { name,
            status,
            isChoosen,
        } = updateProject;
        try {
            const existingProject = await this.findProjectById(id);
            existingProject.name = name;
            existingProject.status = status;
            existingProject.isChoosen = isChoosen;
            return existingProject.save();
        } catch (error) {
            ThrowExeptionHandler(error);
        }
    }

    async deleteProject(id: string) {
        try {
            const existingProject = await this.findProjectById(id);
            if (existingProject) {
                const result = await this.projectModel.deleteOne({ _id: id }).exec();
            }
        } catch (error) {
            ThrowExeptionHandler(error);
        }

    }
}
