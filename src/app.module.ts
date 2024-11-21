import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule } from '@nestjs/typeorm'; 

import { getTypeORMConfig } from './configs/getTypeORMConfig';

import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { getGraphQLConfig } from './configs/getGraphQLConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(getTypeORMConfig()),
    GraphQLModule.forRootAsync(getGraphQLConfig()),

    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
