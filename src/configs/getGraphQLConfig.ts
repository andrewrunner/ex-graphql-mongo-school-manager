import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


export const getGraphQLConfig = () => ({
  driver: ApolloDriver,
  useFactory: (): ApolloDriverConfig => ({
    autoSchemaFile: true, 
    // autoSchemaFile: config.get<string>('GRAPHQL_SCHEMA_FILEPATH'),
    // sortSchema: true,
    // debug: (config.get<string>('NODE_ENV') !== 'production') as boolean,
    // uploads: false,
    // path: '/graphql',
    // introspection: config.get<boolean>('GRAPHQL_INTROSPECTION', false)
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
})