import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


const { PORT } = process.env;

const app = `http://localhost:${PORT}`;

describe('AppController (e2e)', () => {

  it('/ (GET)', async () => {
    return await request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
