import { Test, TestingModule } from '@nestjs/testing';
import { StoryController } from './story.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { closeInMongodConnection, rootMongooseTestModule } from '../testConfig';
import { ProjectSchema } from '../project/project.model';
import { StorySchema } from './story.model';
import { StoryService } from './story.service';


describe('StoryController', () => {
  let storyController: StoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }, { name: 'Story', schema: StorySchema }]),
      ],
      controllers: [StoryController],
      providers: [StoryService]
    }).compile();

    storyController = module.get<StoryController>(StoryController);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(storyController).toBeDefined();
  });
});
