// shared/shared.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';

import { ConfigModule } from '../config/config.module'; // Import the ConfigModule
import { TokenService } from '../api/token/jwt.service';
import { JWTModule } from '../api/token/jwt.module';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { YearsModule } from '../years/years.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    JWTModule,
    YearsModule,
    ConfigModule, // Include the ConfigModule
  ],
  providers: [
    TokenService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor, // Register the interceptor globally
    },
  ],
  exports: [TokenService], // Export providers/services that should be accessible from other modules
})
export class SharedModule {}
