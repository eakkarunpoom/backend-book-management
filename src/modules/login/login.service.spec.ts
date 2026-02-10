import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { LoginService } from './login.service';
import { UserRepository } from '../users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './login.dto';

describe('LoginService', () => {
  let service: LoginService;
  let repository: UserRepository;
  let jwt: JwtService

  const mockUserRepository = {
    save: jest.fn(),
    findByUserName: jest.fn(),
  };

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn()
  };

  const mockJWT = {
    sign: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: PinoLogger,
          useValue: mockLogger
        },
        {
          provide: JwtService,
          useValue: mockJWT
        }
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should login success', async () => {
    const dto = {
      userName: 'test',
      password: 'test',
    };

    mockUserRepository.findByUserName.mockResolvedValue(dto);

    jest.spyOn(service, 'comparePassword').mockResolvedValue(true);

    mockJWT.sign.mockResolvedValue('test')

    await service.login(dto as UserDto);

    expect(mockUserRepository.findByUserName)
      .toHaveBeenCalledWith(dto.userName);
  });

});
