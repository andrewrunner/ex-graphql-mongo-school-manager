import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "../student/student.service";
import { AssignStudentsToLessonInput } from "./graphql/assign-students-to-lesson.input";
import { Lesson } from "./entity/lesson.entity";
import { CreateLessonInput } from "./graphql/lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./graphql/lesson.type";


@Resolver(() => LessonType)
export class LessonResolver {

    constructor(
        private lessonService:LessonService,
        private studentService:StudentService
    ) {}


    @Query(() => LessonType)
    lesson(@Args('id') id:string) {
        return this.lessonService.getLesson(id);
    }


    @Query(() => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }


    @ResolveField()
    async studentsOfLesson(@Parent() lesson:Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }


    @Mutation(() => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
        return this.lessonService.createLesson(createLessonInput);
    }


    @Mutation(() => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput) {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }
}