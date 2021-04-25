import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './filters/validation-exceptions.filter';
//import {ValidationPipe} from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationExceptionFilter());
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
