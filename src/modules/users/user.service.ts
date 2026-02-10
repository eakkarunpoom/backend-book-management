import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/user.dto";
import { Users } from "../../modules/users/user.entity";
import { UserRepository } from "../../modules/users/user.repository";
import * as bcrypt from 'bcryptjs';
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: PinoLogger
  ) {}
  async createUser(body: CreateUserDto) {
    try {
      const findUserExist = await this.userRepository.findByUserName(body.userName);
      if (findUserExist) {
        throw new ConflictException('Username already exists');
      }
      const bcryptedPassword = await this.hashPassword(body.password);
      const user = new Users();
      user.userName = body.userName;
      user.password = bcryptedPassword;
      return this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}