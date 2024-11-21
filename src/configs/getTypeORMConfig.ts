import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { Lesson } from '../lesson/entity/lesson.entity';
import { Student } from '../student/entity/student.entity';

export const getTypeORMConfig = ():TypeOrmModuleAsyncOptions => ({
    useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: 'localhost', // 'online-school-db',
        port: 27017,
        database: 'school',
        connectTimeoutMS:60000,

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

// mongodb://localhost:27017

// const getMongoString = (configService: ConfigService) => {
// 	return 'mongodb://' +
// 		configService.get('MONGO_LOGIN', 'admin') +
// 		':' +
// 		configService.get('MONGO_PASSWORD', 'admin') +
// 		'@' +
// 		configService.get('MONGO_HOST', 'localhost') +
// 		':' +
// 		configService.get('MONGO_PORT', '27017') +
// 		'/' +
// 		configService.get('MONGO_DATABASE', 'courses') +
// 		'?authSource=' +
// 		configService.get('MONGO_AUTHDATABASE', 'admin') 
// };