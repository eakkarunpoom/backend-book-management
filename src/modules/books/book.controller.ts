import { Controller, Post } from "@nestjs/common";

@Controller()
export class BookController {
  constructor(){}

  @Post('/book/create')
  createBook(){
    return "Create Book";
  }
}