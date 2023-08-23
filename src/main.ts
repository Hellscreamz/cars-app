import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Your app is running at http://localhost:3000');
  console.log('Your GraphQL is running at http://localhost:3000/graphql');
}
bootstrap();