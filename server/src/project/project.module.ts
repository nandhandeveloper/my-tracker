import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {ProjectSchema} from './project.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
