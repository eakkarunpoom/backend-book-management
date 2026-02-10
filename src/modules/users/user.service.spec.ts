import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserDto } from '../login/login.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  const mockUserRepository = {
    save: jest.fn(),
    findByUserName: jest.fn(),
  };

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: PinoLogger,
          useValue: mockLogger
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should create user', async () => {
    const dto = {
      userName: 'test',
      password: 'test',
    };

    mockUserRepository.findByUserName.mockResolvedValue(null);
    mockUserRepository.save.mockResolvedValue({
      id: 1,
      userName: 'test',
      password: 'hashedpassword'
    });

    await service.createUser(dto as any);

    expect(mockUserRepository.findByUserName)
      .toHaveBeenCalledWith(dto.userName);

    expect(mockUserRepository.save)
      .toHaveBeenCalled();
  });

  it('should not create user username exists', async () => {
    const dto = {
      userName: 'test',
      password: 'test',
    };

    mockUserRepository.findByUserName.mockResolvedValue(true);

    await expect(
      service.createUser(dto as any)
    ).rejects.toThrow('Username already exists');

    expect(mockUserRepository.findByUserName)
      .toHaveBeenCalledWith(dto.userName);
  });

});
