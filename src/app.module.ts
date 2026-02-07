import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';

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
  ],
})
export class AppModule {}
