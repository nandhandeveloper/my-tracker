import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Project } from './project.model';
import { ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'To Create a project' })
  @ApiUnprocessableEntityResponse({
    description: 'Project with name already exists',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: ProjectDto })
  async createProject(@Body() newProject: ProjectDto): Promise<ProjectDto> {
    return await this.projectService.createProject(newProject);
  }

  @Get(':id')
  @ApiOperation({ summary: 'To find a project details by id' })
  @ApiNotFoundResponse({ description: 'Project not found with the id given' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findProjectById(@Param('id') id: string): Promise<ProjectDto> {
    return await this.projectService.findProjectById(id);
  }

  @Get('')
  @ApiOperation({ summary: 'To find all projects present in the database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Users successfully fetched' })
  async findAllProject(): Promise<ProjectDto[]> {
    return await this.projectService.findAllProjects();
  }

  @Put(':id')
  @ApiOperation({ summary: 'To update an existing project details' })
  @ApiNotFoundResponse({ description: 'Project not found with the id given' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: ProjectDto })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProject: ProjectDto,
  ): Promise<ProjectDto> {
    return await this.projectService.updateProject(id, updateProject);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'To delete an existing project and its related stories',
  })
  @ApiNotFoundResponse({ description: 'Project not found with the id given' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteProject(@Param('id') id: string) {
    await this.projectService.deleteProject(id);
  }
}
