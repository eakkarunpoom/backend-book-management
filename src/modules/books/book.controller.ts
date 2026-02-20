import { Request, Controller, Post, UseGuards, Body, Get, Param, Put, Patch, Delete, Query } from "@nestjs/common";
import { JwtAuthGuard } from "../login/jwt.guard";
import { BookDto } from "./book.dto";
import { BookService } from "./book.service";
import { GetUser } from "../../utils/get-user.utils";

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createBook(
    @Body() req: BookDto,
    @GetUser('userName') userName: string
  ) {
    return this.bookService.createBook(req, userName);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  getBook() {
    return this.bookService.getBook();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-book')
  getBooks(
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.bookService.getBookPage(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateBook(
    @Body() req: Partial<BookDto>,
    @Param('id') id: number
  ) {
    return this.bookService.update(req, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteBook(
    @Param('id') id: number
  ) {
    return this.bookService.deleteBook(id);
  }
}