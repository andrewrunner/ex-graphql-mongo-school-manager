import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule } from '@nestjs/typeorm'; 
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { getTypeORMConfig } from './configs/getTypeORMConfig';

import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(getTypeORMConfig()),

    GraphQLModule.forRoot<ApolloDriverConfig>({
        autoSchemaFile: true, // code first approzch? tacke in-memry
        driver: ApolloDriver
      }),
  
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
