import { Test, TestingModule } from '@nestjs/testing';
import { StoryService } from './story.service';
import { MongooseModule } from '@nestjs/mongoose'
import { closeInMongodConnection, rootMongooseTestModule } from '../testConfig';
import { ProjectSchema } from '../project/project.model';
import { StorySchema } from './story.model';


describe('StoryService', () => {
  let storyService: StoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }, { name: 'Story', schema: StorySchema }]),
      ],
      providers: [StoryService],
    }).compile();

    storyService = module.get<StoryService>(StoryService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(storyService).toBeDefined();
  });
});
