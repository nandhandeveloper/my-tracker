import { StoryService } from './../story/story.service';
import { Project } from './project.model';
import { ProjectDto } from './dto/project.dto';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ThrowExeptionHandler } from '../util/throwExecptionHandler';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    private storyService: StoryService,
  ) {}

  async createProject(incomingProject: ProjectDto): Promise<ProjectDto> {
    const { name } = incomingProject;
    try {
      const existingProject = await this.projectModel.findOne({ name }).exec();
      if (existingProject) {
        throw new UnprocessableEntityException(
          `Project with name ${name} already exists`,
        );
      }
      const newProject = new this.projectModel({ ...incomingProject });
      return newProject.save();
    } catch (error) {
      ThrowExeptionHandler(error);
    }
  }

  async findAllProjects(): Promise<ProjectDto[]> {
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

  async updateSelectedProjectToUnSelected() {
    const existingProject = await this.projectModel
      .findOne({ isChoosen: true })
      .exec();
    if (existingProject) {
      existingProject.isChoosen = false;
      await existingProject.save();
    }
  }

  async updateProject(
    id: string,
    updateProject: ProjectDto,
    isSelected = false,
  ): Promise<ProjectDto> {
    const { name, status, isChoosen } = updateProject;
    try {
      if (isSelected) {
        await this.updateSelectedProjectToUnSelected();
      }
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
      await this.storyService.deleteStoriesByProjectId(id, existingProject);
      await this.projectModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      ThrowExeptionHandler(error);
    }
  }
}
