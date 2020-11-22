import { ProjectController } from './../src/project/project.controller';
import { ProjectService } from './../src/project/project.service';
import { ProjectDTO } from './../dist/project/projectDTO.d';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';

import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../src/project/project.model';
import { ProjectModule } from '../src/project/project.module';

// jest.mock('../src/project/project.service.ts');

// const app = 'http://localhost:8080';

const findAllProjects = () => [];

const findProjectById = (id: string) => {
  console.log(id);
  if (id === 'existingID') {
    return {
      _id: 'existingID',
      name: 'projectName',
      isChoosen: true,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  } else {
    throw new NotFoundException();
  }
}

describe('Projects Controller (e2e)', () => {
  // let ProjectService: ProjectService
  let app: INestApplication;
  let projectService = {
    findAllProjects,
    findProjectById
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // ProjectModule,
      ],
      controllers: [ProjectController],
      providers: [ProjectService]
    })
      .overrideProvider(ProjectService)
      .useValue(projectService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // await closeInMongodConnection();
    await app.close();
  });

  it('should return all the projects present in the database ', async () => {
    return await request(app.getHttpServer())
      .get('/projects')
      .expect(HttpStatus.OK)
      .expect(({ body }: { body: ProjectDTO[] }) => {
        expect(body.length).toBeGreaterThanOrEqual(0);
      });
  });

  it('should return the project details when project id present in db is passed', async () => {
    const existingId = 'existingID';
    return await request(app.getHttpServer())
      .get(`/projects/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(({ body }: { body: ProjectDTO }) => {
        console.log(body);
        expect(body).toHaveProperty('_id', existingId);
      });
  });


  it('should throw error 404 when no project is found with the id given', async () => {
    const existingId = 'nonExistingID';
    return await request(app.getHttpServer())
      .get(`/projects/${existingId}`)
      .expect(HttpStatus.NOT_FOUND);
  });

});