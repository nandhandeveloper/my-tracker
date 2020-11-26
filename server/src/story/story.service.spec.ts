import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { StoryType } from './../constants/stroyType';
import { StoryCritical } from './../constants/stroyCritical';
import { StoryStatus } from './../constants/stroyStatus';
import { StoryDto } from './dto/story.dto';
import { ProjectService } from './../project/project.service';
import { ProjectDto } from './../project/dto/project.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { StoryService } from './story.service';
import { MongooseModule } from '@nestjs/mongoose'
import { closeInMongodConnection, rootMongooseTestModule } from '../testConfig';
import { ProjectSchema } from '../project/project.model';
import { StorySchema } from './story.model';
import { ProjectStatus } from '../constants/projectStatus';
import { StoryTechnology } from '../constants/stroyTechnology';


const INVALID_ID = '5fb730ca227bd2dcf72acd49';
const ERROR_PROJECT_ID = 'dummyiddummyiddummyid432';

export const createNewProject = () => {
  
}

describe('StoryService', () => {
  let storyService: StoryService;
  let projectService: ProjectService;
  let existingProject: ProjectDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }, { name: 'Story', schema: StorySchema }]),
      ],
      providers: [StoryService, ProjectService],
    }).compile();

    storyService = module.get<StoryService>(StoryService);
    projectService = module.get<ProjectService>(ProjectService);

    const newProject: ProjectDto = {
      name: 'project1',
      status: ProjectStatus.ACTIVE,
      isChoosen: true
    };
    existingProject = await projectService.createProject(newProject);

  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(storyService).toBeDefined();
  });

  it('FIND ALL STORIES - should return all the stories from the database', async () => {
    const newStory: StoryDto = {
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    };
    await storyService.createStory(newStory);
    const response: StoryDto[] = await storyService.findAllStories();
    expect(response.length).toBeGreaterThan(0);
  });

  it('CREATE STORY - should return all the stories from the database', async () => {
    const newStory: StoryDto = {
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    };
    const response: StoryDto = await storyService.createStory(newStory);
    expect(response).toHaveProperty('_id');
    expect(response).toHaveProperty('content', newStory.content);
    expect(response).toHaveProperty('technology', newStory.technology);
    expect(response).toHaveProperty('status', newStory.status);
    expect(response).toHaveProperty('critical', newStory.critical);
    expect(response).toHaveProperty('type', newStory.type);
    expect(response).toHaveProperty('project');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('updatedAt');
    expect(response.createdAt).toEqual(response.updatedAt);
  });

  it('CREATE STORY - should throw NOT FOUND error when project Id is not found', async () => {
    existingProject._id = INVALID_ID;
    const newStory: StoryDto = {
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    };

    await expect(storyService.createStory(newStory))
      .rejects
      .toThrow(new NotFoundException(`No Project found with the id ${existingProject._id}`));
  });

  it('FIND ALL STORIES BY PROJECT -  should return a stories based on the project selected', async () => {

    expect(await storyService.findStoriesByProjectId(existingProject._id)).toHaveLength(0);
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
      }
    ];
    await Promise.all(
      storiesList.map(async (story: StoryDto) => {
        await storyService.createStory(story);
      })
    );
    expect(await storyService.findStoriesByProjectId(existingProject._id)).toHaveLength(2);

  });

  it('FIND ALL STORIES BY PROJECT -  should return 404 not found error when no project with id sent', async () => {
    await expect(storyService.findStoriesByProjectId(INVALID_ID))
      .rejects
      .toThrow(new NotFoundException(`No Project found with the id ${INVALID_ID}`));
  });

  it('UPDATE STORY -  should update the exiting story', async () => {
    const newStory: StoryDto = {
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    };
    const exitingStory: StoryDto = await storyService.createStory(newStory);
    exitingStory.type = StoryType.CHORE;
    exitingStory.critical = StoryCritical.HIGH;
    exitingStory.technology = StoryTechnology.DATABASE;
    exitingStory.status = StoryStatus.COMPLETE;
    exitingStory.project = existingProject;
    exitingStory.content = 'edited content for description';

    const updatedStory: StoryDto = await storyService.updateStory(exitingStory._id, exitingStory);

    expect(updatedStory).toHaveProperty('_id');
    expect(updatedStory).toHaveProperty('content', exitingStory.content);
    expect(updatedStory).toHaveProperty('technology', exitingStory.technology);
    expect(updatedStory).toHaveProperty('status', exitingStory.status);
    expect(updatedStory).toHaveProperty('critical', exitingStory.critical);
    expect(updatedStory).toHaveProperty('type', exitingStory.type);
    expect(updatedStory).toHaveProperty('project');
    expect(updatedStory).toHaveProperty('createdAt');
    expect(updatedStory).toHaveProperty('updatedAt');
    expect(updatedStory.createdAt).not.toEqual(updatedStory.updatedAt);
  });

  it('UPDATE STORY -  should throw 404 error when project with the given id is not found', async () => {
    existingProject._id = INVALID_ID;
    const existingStory = {
      _id: INVALID_ID,
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    }
    await expect(storyService.updateStory(existingStory._id, existingStory))
      .rejects
      .toThrow(new NotFoundException(`No Project found with the id ${existingProject._id}`));
  });

  it('UPDATE STORY -  should throw 404 error when story with the given id is not found', async () => {
    const existingStory = {
      _id: INVALID_ID,
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    }
    await expect(storyService.updateStory(existingStory._id, existingStory))
      .rejects
      .toThrow(new NotFoundException(`No Story found with the id ${existingStory._id}`));
  });

  it('DELETE STORY -  should throw 404 error when story with the given id is not found', async () => {
    const existingStory = {
      _id: INVALID_ID,
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    }
    await expect(storyService.deleteStory(existingStory._id))
      .rejects
      .toThrow(new NotFoundException(`No Story found with the id ${existingStory._id}`));
  });

  it('DELETE STORY -  should delete a story when the story id is present in database', async () => {
    const newStory = {
      content: 'some description about the story',
      technology: StoryTechnology.FRONTEND,
      status: StoryStatus.ACTIVE,
      critical: StoryCritical.MEDIUM,
      project: existingProject,
      type: StoryType.FEATURE,
    }
    const existingStory = await storyService.createStory(newStory);
    expect(await storyService.findAllStories()).toHaveLength(1);
    await storyService.deleteStory(existingStory._id);
    expect(await storyService.findAllStories()).toHaveLength(0);
  });

});
