import { StoryService } from './story.service';
import { Controller, Get,Post, Put, Delete, Param, Body } from '@nestjs/common';
import { storyDTO } from './storyDTO';

@Controller('stories')
export class StoryController {
    constructor(private storyService: StoryService){}

    @Get()
    async findAllStories(): Promise<storyDTO[]> {
        return await this.storyService.findAllStories();
    }

    @Get('/project/:projectId')
    async findStoriesBYaProjectId(@Param('projectId') projectId: string): Promise<storyDTO[]> {
        return await this.storyService.findStoriesByProjectId(projectId);
    }

    @Post()
    async createStory(@Body() newStroy: storyDTO): Promise<storyDTO> {
        return await this.storyService.createStory(newStroy);
    }

    @Put(':storyId')
    async updateStory(@Param('storyId') storyId: string, @Body() updteStroy: storyDTO): Promise<storyDTO> {
        return await this.storyService.updateStory(storyId, updteStroy);
    }

    @Delete(':storyId')
    async deleteStory(@Param('storyId') storyId: string) {
         await this.storyService.deleteStory(storyId);
    }



}
