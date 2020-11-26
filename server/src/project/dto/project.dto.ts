import { ProjectStatus } from './../../constants/projectStatus';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
    @ApiProperty({type: String, description: 'Unique id of a project'})
    _id?: string;
    @ApiProperty({type: String, description: 'Unique name of a project'})
    name: string;
    @ApiProperty({type: String, enum:[ProjectStatus.ACTIVE,ProjectStatus.INACTIVE, ProjectStatus.ONHOLD], description: 'Project status'})
    status: ProjectStatus;
    @ApiProperty({type: Boolean, description: 'property to know current working project'})
    isChoosen: boolean;
    @ApiProperty({type: Date, description: 'project creation date'})
    createdAt?: Date;
    @ApiProperty({type: Date, description: 'project update date'})
    updatedAt?: Date;
}