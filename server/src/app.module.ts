import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: 'env.local'}), MongooseModule.forRoot(process.env.DB_CONNECTION), ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
