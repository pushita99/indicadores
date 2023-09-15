import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
    origin:['http://localhost:3000',
            'http://localhost:5173']
  });
  app.useGlobalPipes(
    new ValidationPipe ({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
