import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {

    constructor(private projectService: ProjectService) {}

    @Post()
    async createProject(@Body() newProject: Project): Promise<Project> {
        return await this.projectService.createProject(newProject);
    }
    
    @Get(':id')
    async findProjectById(@Param('id') id: string): Promise<Project> {
        return await this.projectService.findProjectById(id);
    }

    @Get('')
    async findAllProject(): Promise<Project[]> {
        return await this.projectService.findAllProject();
    }

    @Put('id')
    async updateProject(@Param('id') id: string, @Body() updateProject: Project): Promise<Project> {
        return await this.projectService.updateProject(id, updateProject);
    }

    @Delete('id')
    async deleteProject(@Param('id') id: string) {
        return await this.projectService.deleteProject(id);
    }
}
