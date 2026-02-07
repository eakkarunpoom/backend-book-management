import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Books } from "./book.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Books) private readonly repository: Repository<Books>,
  ) {}
  async create(book: Books): Promise<Books>{
    return this.repository.save(book);
  }

  async getAll(): Promise<Books[]>{
    return this.repository.find();
  }

  async getBook(id: number): Promise<Books|null>{
    return this.repository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, book: Partial<Books>){
    return this.repository.update(id, book);
  }

  async delete(id: number){
    return this.repository.delete(id);
  }
}