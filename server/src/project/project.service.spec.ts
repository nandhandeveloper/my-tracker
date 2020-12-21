import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { closeInMongodConnection, rootMongooseTestModule } from '../testConfig';
import { ProjectService } from './project.service';
import { ProjectSchema } from './project.model';
import { Project } from './project.model';
import { ProjectDto } from './dto/project.dto';

import {
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StoryService } from '../story/story.service';
import { ProjectStatus } from '../constants/projectStatus';
import { StorySchema } from '../story/story.model';

const INVALID_PROJECT_ID = '5fb730ca227bd2dcf72acd49';
const ERROR_PROJECT_ID = 'dummyID';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let storyService: StoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Project', schema: ProjectSchema },
          { name: 'Story', schema: StorySchema },
        ]),
      ],
      providers: [ProjectService, StoryService],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  it('FIND ALL PROJECTS - should return empty list of projects initially from the data base', async () => {
    const result: ProjectDto[] = await projectService.findAllProjects();
    expect(result).toHaveLength(0);
  });

  it('FIND ALL PROJECTS - should return all the persisted projects from data base ', async () => {
    const incomingList = [
      {
        name: 'project1',
        status: ProjectStatus.ACTIVE,
        isChoosen: false,
      },
      {
        name: 'project2',
        status: ProjectStatus.INACTIVE,
        isChoosen: true,
      },
    ];

    await Promise.all(
      incomingList.map(async (project) => {
        await projectService.createProject(project);
      }),
    );

    const result: ProjectDto[] = await projectService.findAllProjects();
    expect(result).toHaveLength(2);
  });

  it('CREATE PROJECT - should create a new Project if the project name doesnot exists in database', async () => {
    const incomingProject = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    };
    const newProject: ProjectDto = await projectService.createProject(
      incomingProject,
    );
    expect(newProject).toHaveProperty('_id');
    expect(newProject).toHaveProperty('name', incomingProject.name);
    expect(newProject).toHaveProperty('status', incomingProject.status);
    expect(newProject).toHaveProperty('isChoosen', incomingProject.isChoosen);
    expect(newProject).toHaveProperty('createdAt');
    expect(newProject).toHaveProperty('updatedAt');
    expect(newProject.createdAt).toEqual(newProject.updatedAt);
  });

  it('CREATE PROJECT - should throw error if the name of the project is already present in database', async () => {
    const existingProject = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    };
    const incomingProject = {
      name: 'project1',
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    await projectService.createProject(existingProject);

    await expect(projectService.createProject(incomingProject)).rejects.toThrow(
      new UnprocessableEntityException(
        'Project with name project1 already exists',
      ),
    );
  });

  it('FIND BY ID - should return the project details when Id is passed', async () => {
    const incomingProject = {
      name: 'project1',
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    const response: ProjectDto = await projectService.createProject(
      incomingProject,
    );
    const id: string = response._id;

    const existingProject: Project = await projectService.findProjectById(id);

    expect(existingProject).toHaveProperty('_id');
    expect(existingProject).toHaveProperty('name', incomingProject.name);
    expect(existingProject).toHaveProperty('status', incomingProject.status);
    expect(existingProject).toHaveProperty(
      'isChoosen',
      incomingProject.isChoosen,
    );
    expect(existingProject).toHaveProperty('createdAt');
    expect(existingProject).toHaveProperty('updatedAt');
  });

  it('FIND BY ID - should throw not found exception when a project id is not found in DB', async () => {
    const invalidProjectId = '5fb730ca227bd2dcf72acd49';
    await expect(
      projectService.findProjectById(invalidProjectId),
    ).rejects.toThrow(
      new NotFoundException(`No Project found with the id ${invalidProjectId}`),
    );
  });

  it('DELETE PROJECT - Should delete the record if present in the database', async () => {
    const incomingProject = {
      name: 'project1',
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    const response: ProjectDto = await projectService.createProject(
      incomingProject,
    );
    const id: string = response._id;

    const allProjects: ProjectDto[] = await projectService.findAllProjects();
    expect(allProjects).toHaveLength(1);

    await projectService.deleteProject(id);

    const projectList: ProjectDto[] = await projectService.findAllProjects();
    expect(projectList).toHaveLength(0);
  });

  it('DELETE PROJECT - should throw error, when an id of INCORRECT format is sent', async () => {
    const dummyId: string = ERROR_PROJECT_ID;
    await expect(projectService.deleteProject(dummyId)).rejects.toThrow(
      new InternalServerErrorException(
        'Something went wrong. Please try again',
      ),
    );
  });

  it('DELETE PROJECT - should throw not found exception when a project id is not found in DB', async () => {
    const invalidProjectId: string = INVALID_PROJECT_ID;

    await expect(
      projectService.deleteProject(invalidProjectId),
    ).rejects.toThrow(
      new NotFoundException(`No Project found with the id ${invalidProjectId}`),
    );
  });

  it('UPDATE PROJECT -  should return updated objected', async () => {
    const existingProject = {
      name: 'project1',
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    const response: ProjectDto = await projectService.createProject(
      existingProject,
    );
    const incomingId = response._id;
    const incomingProject = {
      name: 'project2',
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    };
    const updatedProject: ProjectDto = await projectService.updateProject(
      incomingId,
      incomingProject,
    );
    expect(updatedProject).toHaveProperty('_id');
    expect(updatedProject).toHaveProperty('name', incomingProject.name);
    expect(updatedProject).toHaveProperty('status', incomingProject.status);
    expect(updatedProject).toHaveProperty(
      'isChoosen',
      incomingProject.isChoosen,
    );
    expect(updatedProject).toHaveProperty('createdAt');
    expect(updatedProject).toHaveProperty('updatedAt');
    expect(updatedProject.createdAt).not.toEqual(updatedProject.updatedAt);
  });

  it('UPDATE PROJECT -  should throw not found error when a project with an ID not present in database', async () => {
    const invalidProjectId = INVALID_PROJECT_ID;
    const incomingProject = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    };
    await expect(
      projectService.updateProject(invalidProjectId, incomingProject),
    ).rejects.toThrow(
      new NotFoundException(`No Project found with the id ${invalidProjectId}`),
    );
  });

  it('UPDATE PROJECT -  should throw Something went wrong error when a error projectId is passed as incoming ID', async () => {
    const errorId = ERROR_PROJECT_ID;
    const incomingProject = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    };
    await expect(
      projectService.updateProject(errorId, incomingProject),
    ).rejects.toThrow(
      new InternalServerErrorException(
        `Something went wrong. Please try again`,
      ),
    );
  });
});
