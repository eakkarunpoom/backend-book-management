import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { BookModule } from './modules/books/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', //env
      password: '', //env
      database: 'book-management', //env
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    LoginModule,
    BookModule
  ],
})
export class AppModule {}
