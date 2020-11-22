import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';

const { NODE_ENV } = process.env;

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: `env.${NODE_ENV}` }),
  MongooseModule.forRoot(process.env.DB_CONNECTION),
    ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
