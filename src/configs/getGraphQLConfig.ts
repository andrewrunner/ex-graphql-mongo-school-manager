import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


export const getGraphQLConfig = () => ({
    useFactory: (): ApolloDriverConfig => ({
        autoSchemaFile: true, // code first approzch? tacke in-memry
        driver: ApolloDriver
      }),
    inject: [ConfigService],
    imports: [ConfigModule],
})