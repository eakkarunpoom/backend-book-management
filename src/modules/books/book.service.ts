import { Injectable } from "@nestjs/common";
import { BookDto } from "./book.dto";
import { BookRepository } from "./book.repository";
import { Books } from "./book.entity";

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository
  ) { }
  async createBook(request: BookDto) {
    try {
      const books = new Books();
      books.title = request.title;
      books.author = request.author;
      books.publishedYear = request.publishedYear;
      books.genre = request.genre;
      const create = await this.bookRepository.create(books);
      return create;
    } catch (error) {
      throw error;
    }
  }

  async getBook() {
    try {
      const findAllBook = await this.bookRepository.getAll()
      return findAllBook
    } catch (error) {
      throw error
    }
  }

  async getBookPage(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await this.bookRepository.getPage(skip, limit)
      return {
        data,
        row: {
          total,
          page,
          limit,
          totalPage: Math.ceil(total / limit)
        }
      }
    } catch (error) {
      throw error
    }
  }

  async update(request: Partial<BookDto>, id: number) {
    try {
      await this.bookRepository.update(id, request)
      const findBook = await this.bookRepository.getBook(id)
      return findBook
    } catch (error) {
      throw error
    }
  }

  async deleteBook(id: number) {
    try {
      await this.bookRepository.delete(id)
      const findBook = await this.bookRepository.getBook(id)
      if (!findBook) {
        return {
          data: {
            message: `Delete Book Success`
          }
        }
      }
    } catch (error) {
      throw error
    }
  }
}