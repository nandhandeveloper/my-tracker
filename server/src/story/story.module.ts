import { StorySchema } from './story.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { ProjectSchema } from '../project/project.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}, {name: 'Story', schema: StorySchema}]),],
  controllers: [StoryController],
  providers: [StoryService],
  exports: [StoryService]
})
export class StoryModule {}
