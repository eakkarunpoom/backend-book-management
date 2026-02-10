import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/user.dto";
import { UserService } from "../../modules/users/user.service";

@Controller('user')

export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post('create')
  async createUser(@Body() body: CreateUserDto){
    return await this.userService.createUser(body);
  }
}