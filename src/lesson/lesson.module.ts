import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lesson } from './entity/lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { StudentModule } from '../student/student.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Lesson
        ]),
        StudentModule
    ],
    providers: [
        LessonResolver, 
        LessonService
    ]
})
export class LessonModule {}
