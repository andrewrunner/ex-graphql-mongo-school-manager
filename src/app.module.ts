import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule } from '@nestjs/typeorm'; 
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        autoSchemaFile: true, // code first approzch? tacke in-memry
        driver: ApolloDriver
      }),
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
