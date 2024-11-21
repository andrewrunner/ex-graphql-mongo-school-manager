import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput {

    @IsUUID( "4", { each: true }) // 4я версия, для всех (если массив)
    @Field(() => ID)
    lessonId:string;

    @IsUUID()
    @Field(() => [ID])
    studentIds: string[];

}