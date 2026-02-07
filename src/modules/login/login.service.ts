import { ConflictException, Injectable } from "@nestjs/common";
import { UserDto } from "./login.dto";
import { Users } from "../users/user.entity";
import { UserRepository } from "../users/user.repository";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ){}

  async login(body: UserDto){
    const findUser = await this.userRepository.findByUserName(body.userName);
    if(!findUser){
      throw new ConflictException('Username or Password incorrect');
    }
    const isPasswordMatching = await this.comparePassword(body.password, findUser.password);
    if(!isPasswordMatching){
      throw new ConflictException('Username or Password incorrect');
    }
    const payload = {
      userName: findUser.user_name
    }
    const accessToken = this.jwtService.sign(payload);
    return {
      token: accessToken
    };
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}