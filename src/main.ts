import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, //ลบ field ที่ไม่ได้อยู่ใน DTO
      forbidNonWhitelisted: true, //ยิง field แปลกมา → error
      transform: true, //auto convert string → number
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
