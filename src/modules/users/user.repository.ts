import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/modules/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users) private readonly repository: Repository<Users>,
  ){}

  async save(user: Users): Promise<Users>{
    return this.repository.save(user);
  }

  async findByUserName(userName: string): Promise<Users | null>{
    return this.repository.findOne({
      where: {
        user_name: userName
      }
    });
  }
}