import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./graphql/create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./graphql/student.type";


@Resolver(() => StudentType)
export class StudentResolver {

    constructor(
        private studentService:StudentService
    ) {}

    @Query(() => StudentType)
    student(@Args('id') id:string) {
        return this.studentService.getStudent(id);
    }

    @Query(() => [StudentType])
    students() {
        return this.studentService.getStudents();
    }

    @Mutation(() => StudentType)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        return this.studentService.createStudent(createStudentInput);
    }

    @Mutation(() => Boolean)
    removeStudent(@Args('id') id:string) {
        return this.studentService.removeStudent(id);
    }
}