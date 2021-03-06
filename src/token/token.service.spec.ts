import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let repository: Repository<Token>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        
        {
          provide: getRepositoryToken(Token),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            metadata: {
              propertiesMap: {},
            },
          },
        },
      ],
    }).compile();

    service = module.get(TokenService);
    repository = module.get(getRepositoryToken(Token));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
