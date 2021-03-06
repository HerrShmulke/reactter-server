import { forwardRef } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Token } from 'src/token/token.entity';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(() => {
              return new User();
            }),
            insert: jest.fn(),
            metadata: {
              propertiesMap: {},
            },
          },
        },
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
        {
          provide: AuthService,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {},
        },
        UserService,
      ],
    }).compile();

    resolver = module.get(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Create user', () => {
    it('shoult create user and return true', async () => {
      const isUserRegister = await resolver.createUser({
        name: 'Alex',
        password: '123123',
      });

      expect(isUserRegister).toBeTruthy();
    });
  });
});
