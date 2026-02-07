import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { BookController } from './controllers/book.controller';

@Module({
  imports: [],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}
