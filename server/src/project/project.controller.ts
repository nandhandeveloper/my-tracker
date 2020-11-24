import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { Project } from './project.model';
import { ProjectDTO } from './projectDTO';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {

    constructor(private projectService: ProjectService) {}

    @Post()
    async createProject(@Body() newProject: ProjectDTO): Promise<ProjectDTO> {
        return await this.projectService.createProject(newProject);
    }
    
    @Get(':id')
    async findProjectById(@Param('id') id: string): Promise<ProjectDTO> {
        return await this.projectService.findProjectById(id);
    }

    @Get('')
    async findAllProject(): Promise<ProjectDTO[]> {
        return await this.projectService.findAllProjects();
    }

    @Put(':id')
    async updateProject(@Param('id') id: string, @Body() updateProject: ProjectDTO): Promise<ProjectDTO> {
        return await this.projectService.updateProject(id, updateProject);
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: string) {
         await this.projectService.deleteProject(id);
    }
}