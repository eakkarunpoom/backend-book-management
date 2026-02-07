import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/user.entity";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { UserRepository } from "../users/user.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'mySecretKey', //env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, UserRepository]
})

export class LoginModule { }