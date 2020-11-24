import { ProjectController } from './../src/project/project.controller';
import { ProjectService } from './../src/project/project.service';
import { ProjectDTO } from './../dist/project/projectDTO.d';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../src/project/project.model';
import { ProjectModule } from '../src/project/project.module';

// jest.mock('../src/project/project.service.ts');
const { PORT } = process.env;

const app = `http://localhost:${PORT}`;

const INVALID_PROJECT_ID = '5fb730ca227bd2dcf72acd49';


describe('Projects Controller (e2e)', () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-db?user=kaushik&password=kaushik');
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async (done) => {
   
    await mongoose.disconnect(done);
  });

  it('GET /projects - should return all the projects present in the database ', async () => {
    return await request(app)
      .get('/projects')
      .expect(HttpStatus.OK)
      .expect(({ body }: { body: ProjectDTO[] }) => {
        expect(body.length).toBeGreaterThanOrEqual(0);
      });
  });


  it('GET /projects/:id - should throw error 404 when no project is found with the id given', async () => {
    const existingId = 'nonExistingID';
    return await request(app)
      .get(`/projects/${existingId}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });


  it('GET /projects/:id - should return the Project entity when a project is found with the id given', async () => {

    const newProject: ProjectDTO = {
      name: 'project1',
      isChoosen: false,
      status: 'ACTIVE'
    };

    let existingProjectId: string;

       await request(app)
      .post(`/projects`)
      .send(newProject)
      .expect(HttpStatus.CREATED)
      .expect(({body}: {body: ProjectDTO})=>{
        existingProjectId = body._id
      });

    return await request(app)
      .get(`/projects/${existingProjectId}`)
      .expect(HttpStatus.OK)
      .expect(({body}: {body: ProjectDTO})=>{
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('name', newProject.name);
        expect(body).toHaveProperty('isChoosen', newProject.isChoosen);
        expect(body).toHaveProperty('status', newProject.status);
      });
  });

  it('DELETE /projects/:id - should throw error 500 when some thing went wrong in server', async () => {
    const existingId = 'nonExistingID';
    return await request(app)
      .delete(`/projects/${existingId}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('DELETE /projects/:id - should throw error 404 when project id is not found in Database', async () => {
    const existingId = INVALID_PROJECT_ID;
    return await request(app)
      .delete(`/projects/${existingId}`)
      .expect(HttpStatus.NOT_FOUND);
  });

});