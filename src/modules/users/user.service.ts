import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/modules/users/user.dto";
import { Users } from "src/modules/users/user.entity";
import { UserRepository } from "src/modules/users/user.repository";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
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