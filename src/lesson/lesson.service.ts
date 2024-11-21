import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entity/lesson.entity';
import { v4 as uuid } from 'uuid'; 
import { CreateLessonInput } from './graphql/lesson.input';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson) private lessonRepostiroy: Repository<Lesson>
    ) {}


    async getLesson(id:string): Promise<Lesson> {
        return this.lessonRepostiroy.findOneBy({
            id
        });
    }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepostiroy.find();
    }


    async createLesson(createLessonInput:CreateLessonInput): Promise<Lesson> {
        const {name, startDate, endDate, students} = createLessonInput;

        const lesson = this.lessonRepostiroy.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });

        return this.lessonRepostiroy.save(lesson);
    }

    async assignStudentsToLesson(lessonId:string, studentIds:string[]):Promise<Lesson> {
        const lesson = await this.lessonRepostiroy.findOneBy({
            id:lessonId
        })

        lesson.students = [...lesson.students, ...studentIds];

        return this.lessonRepostiroy.save(lesson);
    }
}
