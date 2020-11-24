import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {ProjectSchema} from './project.model';
import { StoryModule } from '../story/story.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}]), StoryModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
