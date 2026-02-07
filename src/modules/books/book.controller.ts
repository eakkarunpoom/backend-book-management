import { Controller, Post } from "@nestjs/common";

@Controller('book')
export class BookController {
  constructor(){}

  @Post('create')
  createBook(){
    return "Create Book";
  }
}