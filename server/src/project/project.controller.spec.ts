import { StorySchema } from './../story/story.model';
import { StoryService } from './../story/story.service';
import { UnprocessableEntityException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProjectDTO } from '../project/projectDTO';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';


import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema, Project } from './project.model';
import { closeInMongodConnection, rootMongooseTestModule } from '../testConfig';
import { ProjectStatus } from '../constants/projectStatus';

const INVALID_PROJECT_ID = '5fb730ca227bd2dcf72acd49';
const ERROR_PROJECT_ID = 'dummyID';

describe('ProjectController', () => {
  let projectController: ProjectController;
  // let projectService: ProjectService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }, { name: 'Story', schema: StorySchema }]),
      ],
      controllers: [ProjectController],
      providers: [ProjectService, StoryService]
    }).compile();

    projectController = module.get<ProjectController>(ProjectController);
    // projectService = module.get<ProjectService>(ProjectService);
  });


  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });

  it('FIND ALL PROJECTS - should return all the projects from database', async () => {
    const resposne: ProjectDTO[] = await projectController.findAllProject();
    expect(resposne).toHaveLength(0);
  });

  it('CREATE PROJECT - should create a project in database if doesnot exists', async () => {
    const newProject: ProjectDTO = {
      name: 'project1',
      status: ProjectStatus.INACTIVE,
      isChoosen: false
    };
    const resposne: ProjectDTO = await projectController.createProject(newProject);
    expect(resposne).toBeDefined();
    expect(resposne).toHaveProperty('_id');
    expect(resposne).toHaveProperty('name', newProject.name);
    expect(resposne).toHaveProperty('createdAt');
    expect(resposne).toHaveProperty('updatedAt');
  });


  it('CREATE PROJECT - should throw 422 error when project name already exists in DB', async () => {
    const existingProject: ProjectDTO = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: false
    };
    const newProject: ProjectDTO = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: true
    };

    await projectController.createProject(existingProject);
    await expect(projectController.createProject(newProject))
      .rejects
      .toThrow(new UnprocessableEntityException('Project with name project1 already exists'));
  });




  it('FIND BY ID - should return the project details when Id is passed', async () => {
    const incomingProject = {
      name: "project1",
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    const response: ProjectDTO = await projectController.createProject(incomingProject);
    const id: string = response._id;

    const existingProject: ProjectDTO = await projectController.findProjectById(id);

    expect(existingProject).toHaveProperty('_id');
    expect(existingProject).toHaveProperty('name', incomingProject.name);
    expect(existingProject).toHaveProperty('status', incomingProject.status);
    expect(existingProject).toHaveProperty('isChoosen', incomingProject.isChoosen);
    expect(existingProject).toHaveProperty('createdAt');
    expect(existingProject).toHaveProperty('updatedAt');
  });

  it('FIND BY ID - should throw not found exception when a project id is not found in DB', async () => {
    const invalidProjectId: string = '5fb730ca227bd2dcf72acd49';
    await expect(projectController.findProjectById(invalidProjectId))
      .rejects
      .toThrow(new NotFoundException(`No Project found with the id ${invalidProjectId}`));
  });

  it('DELETE PROJECT - Should delete the record if present in the database', async () => {
    const incomingProject = {
      name: "project1",
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    const response: ProjectDTO = await projectController.createProject(incomingProject);
    const id: string = response._id;

    const allProjects: ProjectDTO[] = await projectController.findAllProject();
    expect(allProjects).toHaveLength(1);

    await projectController.deleteProject(id);

    const projectList: ProjectDTO[] = await projectController.findAllProject();
    expect(projectList).toHaveLength(0);

  });

  it('DELETE PROJECT - should throw error, when an id of INCORRECT format is sent', async () => {
    const dummyId: string = ERROR_PROJECT_ID;
    await expect(projectController.deleteProject(dummyId))
      .rejects
      .toThrow(new InternalServerErrorException('Something went wrong. Please try again'));
  });


  it('DELETE PROJECT - should throw not found exception when a project id is not found in DB', async () => {
    const invalidProjectId: string = INVALID_PROJECT_ID;

    await expect(projectController.deleteProject(invalidProjectId))
      .rejects
      .toThrow(new NotFoundException(`No Project found with the id ${invalidProjectId}`));
  });

  it('UPDATE PROJECT -  should return updated objected', async () => {
    const existingProject = {
      name: "project1",
      status: ProjectStatus.INACTIVE,
      isChoosen: true,
    };

    const response: ProjectDTO = await projectController.createProject(existingProject);
    const incomingId = response._id;
    const incomingProject = {
      name: "project2",
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    }
    const updatedProject: ProjectDTO = await projectController.updateProject(incomingId, incomingProject);
    expect(updatedProject).toHaveProperty('_id');
    expect(updatedProject).toHaveProperty('name', incomingProject.name);
    expect(updatedProject).toHaveProperty('status', incomingProject.status);
    expect(updatedProject).toHaveProperty('isChoosen', incomingProject.isChoosen);
    expect(updatedProject).toHaveProperty('createdAt');
    expect(updatedProject).toHaveProperty('updatedAt');
    expect(updatedProject.createdAt).not.toEqual(updatedProject.updatedAt);
  });

  it('UPDATE PROJECT -  should throw not found error when a project with an ID not present in database', async () => {
    const invalidProjectId = INVALID_PROJECT_ID;
    const incomingProject = {
      name: "project1",
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    }
    await expect(projectController.updateProject(invalidProjectId, incomingProject))
      .rejects
      .toThrow(new NotFoundException(`No Project found with the id ${invalidProjectId}`));
  });

  it('UPDATE PROJECT -  should throw Something went wrong error when a error projectId is passed as incoming ID', async () => {
    const errorId = ERROR_PROJECT_ID;
    const incomingProject = {
      name: "project1",
      status: ProjectStatus.ACTIVE,
      isChoosen: false,
    }
    await expect(projectController.updateProject(errorId, incomingProject))
      .rejects
      .toThrow(new InternalServerErrorException(`Something went wrong. Please try again`));
  });


});
