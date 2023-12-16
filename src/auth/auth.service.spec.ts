import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';


const mockUser = {
  email: 'test@example.com',
  _id: '12345',
  password: 'mockAccessToken', // Hashing the password
};
const authServiceResult = {
  access_token: 'mockAccessToken', // Hashing the password
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValueOnce(authServiceResult)
            .mockRejectedValueOnce( new UnauthorizedException()), // Error scenario
          }
        },
        {
          provide: UserService,
          useValue: {
            findOneUser: jest.fn().mockResolvedValue(authServiceResult)
          }
        },
        {
          provide: JwtService,
          useValue: {
            compare: jest.fn().mockRejectedValue(false),
            signAsync: jest.fn().mockResolvedValue(true)
          }
        }
        
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should sign in a user and return an access token', async () => {
    
    jest.spyOn(userService, 'findOneUser').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('access_token');

    const result = await authService.signIn('test@example.com', 'password');

    expect(result).toBeDefined();
  });

  it('should throw UnauthorizedException when passwords do not match', async () => {
    const hashedPassword = await bcrypt.hash('password', 10);
    const mockUser = {
      email: 'test@example.com',
      _id: '12345',
      password: hashedPassword,
    };
  
    jest.spyOn(userService, 'findOneUser').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Passwords do not match
  });
});