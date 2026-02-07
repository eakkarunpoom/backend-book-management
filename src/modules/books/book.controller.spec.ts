import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookDto } from './book.dto';

describe('BookController', () => {
  let controller: BookController;

  const mockBookService = {
    createBook: jest.fn().mockReturnValue({
      "id": 1,
      "title": "Golang",
      "author": "admin",
      "publishedYear": 2026,
      "genre": "Programming",
      "created_at": "2026-02-07T17:17:36.000Z",
      "updated_at": "2026-02-07T17:17:36.000Z"
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

it('should create book', () => {
  const dto = {
    title: 'Golang',
    author: 'admin',
    publishedYear: 2026,
    genre: 'Programming',
  };

  controller.createBook(dto as BookDto);
  expect(mockBookService.createBook).toHaveBeenCalledWith(dto);
  });
});
