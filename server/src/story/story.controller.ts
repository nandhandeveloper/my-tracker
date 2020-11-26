import { StoryService } from './story.service';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StoryDto } from './dto/story.dto';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiOkResponse,
    ApiInternalServerErrorResponse,
    ApiUnprocessableEntityResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('stories')
@Controller('stories')
export class StoryController {
    constructor(private storyService: StoryService) { }

    @Get()
    @ApiOperation({ summary: 'To find all stories present in the database' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({ description: 'Stories successfully fetched' })
    async findAllStories(): Promise<StoryDto[]> {
        return await this.storyService.findAllStories();
    }

    @Get('/project/:projectId')
    @ApiOperation({ summary: 'To find all stories of a selected project' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiOkResponse({ description: 'Stories successfully fetched' })
    @ApiNotFoundResponse({ description: 'No Project found with the id given' })
    async findStoriesByProjectId(@Param('projectId') projectId: string): Promise<StoryDto[]> {
        return await this.storyService.findStoriesByProjectId(projectId);
    }

    @Post()
    @ApiOperation({ summary: 'To Create a Story' })
    @ApiNotFoundResponse({ description: 'No Project found with the id given' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiBody({ type: StoryDto })
    async createStory(@Body() newStroy: StoryDto): Promise<StoryDto> {
        return await this.storyService.createStory(newStroy);
    }

    @Put(':storyId')
    @ApiOperation({ summary: 'To update an existing story details' })
    @ApiNotFoundResponse({ description: 'Project not found with the id given' })
    @ApiNotFoundResponse({ description: 'Story not found with the id given' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiBody({ type: StoryDto })
    async updateStory(@Param('storyId') storyId: string, @Body() updteStroy: StoryDto): Promise<StoryDto> {
        return await this.storyService.updateStory(storyId, updteStroy);
    }

    @Delete(':storyId')
    @ApiOperation({ summary: 'To delete an existing stories from database' })
    @ApiNotFoundResponse({ description: 'Story not found with the id given' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async deleteStory(@Param('storyId') storyId: string) {
        await this.storyService.deleteStory(storyId);
    }
}
