import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookDto } from './book.dto';
import { BookRepository } from './book.repository';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  const mockBookRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>(BookRepository);
  });

  it('should create book', async () => {
    const dto = {
      title: 'Golang',
      author: 'admin',
      publishedYear: 2026,
      genre: 'Programming',
    };

    await service.createBook(dto as BookDto);
    expect(mockBookRepository.create).toHaveBeenCalledWith(dto);
  });
});
