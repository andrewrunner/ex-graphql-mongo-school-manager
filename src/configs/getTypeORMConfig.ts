import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/entity/lesson.entity';
import { Student } from 'src/student/entity/student.entity';

export const getTypeORMConfig = ():TypeOrmModuleAsyncOptions => ({
    useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: 'online-school-db',
        port: 27017,
        database: 'school',

        synchronize: true,
        useUnifiedTopology: true,
        entities: [Lesson, Student]

        // username: 'add-the-username',
        // password: 'fill-with-your-password',
        // useNewUrlParser: true,
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
})