import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import * as request from 'supertest';

import { getTypeORMConfig } from "../configs/getTypeORMConfig";
import { getGraphQLConfig } from "../configs/getGraphQLConfig";

//import { LessonModule } from "../lesson/lesson.module";
import { StudentModule } from "./student.module";
import { Student } from "./entity/student.entity";

describe("Student.resolver test", () => {

  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(getTypeORMConfig()),
        GraphQLModule.forRootAsync(getGraphQLConfig()),

        StudentModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  let createdStudent:Student;

  it('createStudent', async () => { 
    
    const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
            query:`mutation {
                createStudent (
                    createStudentInput: {
                        firstName: "Jhon",
                        lastName: "Smith"
                    }
                ) {
                    id,
                    firstName,
                    lastName
                }
            }`
        });

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data.createStudent).toMatchObject({
        firstName: "Jhon",
        lastName: "Smith",
    })

    createdStudent = response.body.data.createStudent;
  });

/*
  it('get student by id', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
            student (id: "${createdStudent.id}") {
                id,
                firstName,
                lastName
            }
        }`
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.student).toMatchObject(createdStudent);       

  });

  it('get students', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
            students {
                id,
                firstName,
                lastName
            }
        }`
      });
   
    expect(response.status).toEqual(200);
    expect(response.body.data.students).toBeInstanceOf(Array);
    expect(response.body.data.students).not.toHaveLength(0);   
  });
*/


  it('removeStudent', async () => { 
    
    const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
            query:`mutation {
                removeStudent (
                    id: "${createdStudent.id}"
                )
            }`
        });

    expect(response.status).toEqual(200);
    expect(response.body.data.removeStudent).toEqual(true);

  });








//   it('get students', async () => {

//     const response = await request(app.getHttpServer())
//       .post('/graphql')
//      // .set("Accept", "application/json")
//       .send({
//         query: `{
//             students {
//                 firstName
//             }
//         }`
//       });
   
//     expect(response.status).toEqual(200);
//    // expect(response.headers["Content-Type"]).toMatch(/json/);
//     expect(response.body).toBeInstanceOf(Object);

//     console.log(response.body)

//     //expect(response.body.data.students).toEqual(3);
//     //   .set("Accept", "application/json")
//     //   .expect("Content-Type", /json/)
//     //   .expect(200);

       
//   });


  afterAll(() => {
    if (app) {
        app.close();
    }   
  })

})