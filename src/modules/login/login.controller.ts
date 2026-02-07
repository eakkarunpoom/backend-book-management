import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "./login.dto";
import { LoginService } from "./login.service";

@Controller('user')
export class LoginController {
  constructor(
    private readonly loginService: LoginService
  ){}

  @Post('login')
  login(@Body() body: UserDto){
    return this.loginService.login(body);
  }
}