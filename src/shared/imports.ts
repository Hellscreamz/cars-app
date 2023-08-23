import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '../config/config.module';
import { JWTModule } from '../api/token/jwt.module';
import { YearsModule } from '../years/years.module';

export const SharedModuleImports = [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
  JWTModule,
  YearsModule,
  ConfigModule,
];
