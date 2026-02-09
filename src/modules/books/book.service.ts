import { Injectable, NotFoundException } from "@nestjs/common";
import { BookDto } from "./book.dto";
import { BookRepository } from "./book.repository";
import { Books } from "./book.entity";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly logger: PinoLogger
  ) { }
  async createBook(request: BookDto) {
    try {
      this.logger.info({message: 'request creating book', request});
      const books = new Books();
      books.title = request.title;
      books.author = request.author;
      books.publishedYear = request.publishedYear;
      books.genre = request.genre;
      const create = await this.bookRepository.create(books);
      this.logger.info({message: 'response creating book', create});
      return create;
    } catch (error) {
      this.logger.error({
        message: 'error create book',
        error
      })
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
      page = Math.max(1, page);
      limit = Math.min(50, Math.max(1, limit));
      const skip = (page - 1) * limit;
      const [data, total] = await this.bookRepository.getPage(skip, limit)
      this.logger.info({message: 'response data getPage', data});
      this.logger.info({message: 'response total getPage', total});
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
      this.logger.error({
        message: 'error data getPage', 
        page, 
        limit, 
        error
      });
      throw error
    }
  }

  async update(request: Partial<BookDto>, id: number) {
    try {
      await this.bookRepository.update(id, request)
      const findBook = await this.bookRepository.getBook(id)
      if (!findBook) {
        throw new NotFoundException(`Book ${id} not found`);
      }
      this.logger.info({message: 'response findBook update', findBook});
      return findBook
    } catch (error) {
      this.logger.error({
        message: 'error update book',
        error
      })
      throw error
    }
  }

  async deleteBook(id: number) {
    try {
      await this.bookRepository.delete(id)
      const findBook = await this.bookRepository.getBook(id)
      this.logger.info({message: 'response findBook deleteBook', findBook});
      if (!findBook) {
        return {
          data: {
            message: `Delete Book Success`
          }
        }
      }
    } catch (error) {
      this.logger.error({
        message: 'error delete book',
        error
      })
      throw error
    }
  }
}