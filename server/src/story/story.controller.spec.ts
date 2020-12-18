import { NotFoundException } from '@nestjs/common';
import { Project } from './../project/project.model';
import { Test, TestingModule } from '@nestjs/testing';
import { StoryController } from './story.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../testConfig';
import { ProjectSchema } from '../project/project.model';
import { StorySchema } from './story.model';
import { StoryService } from './story.service';
import { ProjectService } from '../project/project.service';
import { ProjectDto } from '../project/dto/project.dto';
import { ProjectStatus } from '../constants/projectStatus';
import { StoryDto } from './dto/story.dto';
import { StoryTechnology } from '../constants/stroyTechnology';
import { StoryStatus } from '../constants/stroyStatus';
import { StoryCritical } from '../constants/stroyCritical';
import { StoryType } from '../constants/stroyType';

const INVALID_ID = '5fb730ca227bd2dcf72acd49';
const ERROR_PROJECT_ID = 'dummyiddummyiddummyid432';

describe('StoryController', () => {
  let storyController: StoryController;
  let storyService: StoryService;
  let projectService: ProjectService;
  let existingProject: ProjectDto;
  let existingStory: StoryDto;
  let newStory: StoryDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Project', schema: ProjectSchema },
          { name: 'Story', schema: StorySchema },
        ]),
      ],
      controllers: [StoryController],
      providers: [StoryService, ProjectService],
    }).compile();

    storyController = module.get<StoryController>(StoryController);
    storyService = module.get<StoryService>(StoryService);
    projectService = module.get<ProjectService>(ProjectService);

    const newProject: ProjectDto = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: true,
    };
    existingProject = await projectService.createProject(newProject);

    newStory = {
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    };
    existingStory = await storyService.createStory(newStory);
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(storyController).toBeDefined();
  });

  it('FIND ALL STORIES - should get all the stroies present in the database', async () => {
    expect(await storyController.findAllStories()).toHaveLength(1);
  });

  it('DELETE STORY - should delete the story with a given ID present in the database', async () => {
    const storyId = existingStory._id;
    expect(await storyService.findAllStories()).toHaveLength(1);
    await storyController.deleteStory(storyId);
    expect(await storyService.findAllStories()).toHaveLength(0);
  });

  it('DELETE STORY - should throw 404 not found error when given story Id is not present in the database', async () => {
    const storyId = INVALID_ID;
    await expect(storyController.deleteStory(storyId)).rejects.toThrow(
      new NotFoundException(`No Story found with the id ${storyId}`),
    );
  });

  it('FIND ALL STORIES BY PROJECT -  should return a stories based on the project selected', async () => {
    expect(
      await storyService.findStoriesByProjectId(existingProject._id),
    ).toHaveLength(1);
    const storiesList = [
      {
        content: 'some description about the story',
        technology: StoryTechnology.DEVOPS,
        status: StoryStatus.ACTIVE,
        critical: StoryCritical.MEDIUM,
        project: existingProject,
        type: StoryType.FEATURE,
      },
      {
        content: 'some 2 description about the story',
        technology: StoryTechnology.DEVOPS,
        status: StoryStatus.ACTIVE,
        critical: StoryCritical.MEDIUM,
        project: existingProject,
        type: StoryType.FEATURE,
      },
    ];
    await Promise.all(
      storiesList.map(async (story: StoryDto) => {
        await storyService.createStory(story);
      }),
    );
    expect(
      await storyController.findStoriesByProjectId(existingProject._id),
    ).toHaveLength(3);
  });

  it('UPDATE STORY -  should update the exiting story', async () => {
    existingStory.type = StoryType.CHORE;
    existingStory.critical = StoryCritical.HIGH;
    existingStory.technology = StoryTechnology.DATABASE;
    existingStory.status = StoryStatus.COMPLETE;
    existingStory.project = existingProject;
    existingStory.content = 'edited content for description';
    const updatedStory: StoryDto = await storyService.updateStory(
      existingStory._id,
      existingStory,
    );
    expect(updatedStory).toHaveProperty('_id');
    expect(updatedStory).toHaveProperty('content', existingStory.content);
    expect(updatedStory).toHaveProperty('technology', existingStory.technology);
    expect(updatedStory).toHaveProperty('status', existingStory.status);
    expect(updatedStory).toHaveProperty('critical', existingStory.critical);
    expect(updatedStory).toHaveProperty('type', existingStory.type);
    expect(updatedStory).toHaveProperty('project');
    expect(updatedStory).toHaveProperty('createdAt');
    expect(updatedStory).toHaveProperty('updatedAt');
    expect(updatedStory.createdAt).not.toEqual(updatedStory.updatedAt);
  });

  it('UPDATE STORY -  should throw 404 error when project with the given id is not found', async () => {
    existingStory.project._id = INVALID_ID;
    await expect(
      storyController.updateStory(existingStory._id, existingStory),
    ).rejects.toThrow(
      new NotFoundException(`No Project found with the id ${INVALID_ID}`),
    );
  });

  it('UPDATE STORY -  should throw 404 error when story with the given id is not found', async () => {
    existingStory._id = INVALID_ID;
    await expect(
      storyController.updateStory(existingStory._id, existingStory),
    ).rejects.toThrow(
      new NotFoundException(`No Story found with the id ${INVALID_ID}`),
    );
  });

  it('CREATE STORY - should return all the stories from the database', async () => {
    expect(existingStory).toHaveProperty('_id');
    expect(existingStory).toHaveProperty('content', newStory.content);
    expect(existingStory).toHaveProperty('technology', newStory.technology);
    expect(existingStory).toHaveProperty('status', newStory.status);
    expect(existingStory).toHaveProperty('critical', newStory.critical);
    expect(existingStory).toHaveProperty('type', newStory.type);
    expect(existingStory).toHaveProperty('project');
    expect(existingStory).toHaveProperty('createdAt');
    expect(existingStory).toHaveProperty('updatedAt');
    expect(existingStory.createdAt).toEqual(existingStory.updatedAt);
  });

  it('CREATE STORY - should throw NOT FOUND error when project Id is not found', async () => {
    existingStory.project._id = INVALID_ID;
    await expect(storyController.createStory(existingStory)).rejects.toThrow(
      new NotFoundException(`No Project found with the id ${INVALID_ID}`),
    );
  });
});
