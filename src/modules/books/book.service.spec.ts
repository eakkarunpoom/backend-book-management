import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookDto } from './book.dto';
import { BookRepository } from './book.repository';
import { PinoLogger } from 'nestjs-pino';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  const mockBookRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getPage: jest.fn(),
    getBook: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
        {
          provide: PinoLogger,
          useValue: mockLogger
        }
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
    expect(mockBookRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(dto)
    );
  });

  it('should get book', async () => {
    await service.getBook();
    expect(mockBookRepository.getAll).toHaveBeenCalledWith();
  });

  it('should getpage book', async () => {
    const data = {
      page: 1,
      limit: 9
    };
    mockBookRepository.getPage.mockResolvedValue([
      [
        {
          id: 1,
          title: 'Golang',
          author: 'admin',
          publishedYear: 2026,
          genre: 'Programming',
        }
      ],
      1
    ]);
    await service.getBookPage(data.page, data.limit);
    expect(mockBookRepository.getPage)
      .toHaveBeenCalledWith(0, data.limit);
  });

  it('should update book', async () => {
    const dto = {
      title: 'Golang',
      author: 'admin',
      publishedYear: 2026,
      genre: 'Programming',
    };
    mockBookRepository.getBook.mockResolvedValue(
      {
        id: 1,
        title: 'Golang',
        author: 'admin',
        publishedYear: 2026,
        genre: 'Programming',
      }
    )
    mockBookRepository.update.mockResolvedValue(true);
    await service.update(dto as any, 1);
    expect(mockBookRepository.getBook)
      .toHaveBeenCalledWith(1);

    expect(mockBookRepository.update)
      .toHaveBeenCalledWith(
        1,
        expect.objectContaining(dto)
      );
  });

  it('should delete book', async () => {
    mockBookRepository.delete.mockResolvedValue(true);
    await service.deleteBook(1);
    expect(mockBookRepository.delete)
      .toHaveBeenCalledWith(1);
  });
});
