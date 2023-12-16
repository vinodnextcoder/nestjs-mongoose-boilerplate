import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = {
  email: 'test@example.com',
  _id: '12345',
  password: 'mockAccessToken', // This should be hashed
};

const hashedPassword = bcrypt.hashSync('password', 10); // Hash the password

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
          provide: UserService,
          useValue: {
            findOneUser: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('access_token'),
            compare: jest.fn().mockImplementation((password, hashed) =>
              bcrypt.compareSync(password, hashed)
            ),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should sign in a user and return an access token', async () => {
    const spyFindOneUser = jest
      .spyOn(userService, 'findOneUser')
      .mockResolvedValue(mockUser);

    const spyCompare = jest
      .spyOn(bcrypt, 'compare')
      .mockReturnValue(true);

    const spySignAsync = jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValue('access_token');

    const result = await authService.signIn('test@example.com', 'password');

    expect(spyFindOneUser).toHaveBeenCalledWith('test@example.com');
    expect(spyCompare).toHaveBeenCalledWith('password', mockUser.password);

    expect(result).toEqual({ access_token: 'access_token' });
  });

  it('should throw UnauthorizedException when passwords do not match', async () => {
    jest.spyOn(userService, 'findOneUser').mockResolvedValue({
      ...mockUser,
      password: hashedPassword, // Use hashed password
    });

    jest.spyOn(bcrypt, 'compare').mockReturnValue(false); // Passwords do not match

    await expect(authService.signIn('test@example.com', 'wrongpassword')).rejects.toThrowError(UnauthorizedException);
  });
});