import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/user.entity";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { UserRepository } from "../users/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'mySecretKey', //env
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, UserRepository, JwtStrategy]
})

export class LoginModule { }