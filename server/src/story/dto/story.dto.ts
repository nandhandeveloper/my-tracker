import { StoryType } from './../../constants/stroyType';
import { StoryTechnology } from './../../constants/stroyTechnology';
import { StoryCritical } from './../../constants/stroyCritical';
import { ProjectDto } from "../../project/dto/project.dto";
import { ApiProperty } from '@nestjs/swagger';
import { StoryStatus } from '../../constants/stroyStatus';

export class StoryDto {
    @ApiProperty({type: String, description: 'Unique id of a story'})
    _id?: string;
    @ApiProperty({type: String, description: 'Unique id of a story'})
    content: string;
    @ApiProperty({type: ProjectDto, description: 'story related to this project'})
    project: ProjectDto;
    @ApiProperty({type: String,enum:[StoryCritical.LOW,StoryCritical.MEDIUM,StoryCritical.HIGH], description: 'criticality of the story'})    
    critical: StoryCritical;
    @ApiProperty({type: String,enum:[StoryTechnology.FRONTEND,StoryTechnology.BACKEND, StoryTechnology.DATABASE, StoryTechnology.DEVOPS, StoryTechnology.OTHER], description: 'which technology the story depends on'})    
    technology: StoryTechnology;
    @ApiProperty({type: String,enum:[StoryType.FEATURE,StoryType.FIX,StoryType.CHORE,StoryType.DOCS,StoryType.TEST,StoryType.REFACTOR,StoryType.STYLE], description: 'The type of the story to work on'})    
    type: StoryType;
    @ApiProperty({type: String,enum:[StoryStatus.ACTIVE,StoryStatus.INACTIVE,StoryStatus.COMPLETE], description: 'current status of the story'})
    status: StoryStatus;
    @ApiProperty({type: Date, description: 'story creation date'})    
    createdAt?: Date;
    @ApiProperty({type: Date, description: 'story update date'})
    updatedAt?: Date;
}