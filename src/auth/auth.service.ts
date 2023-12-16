import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneUser(email);
    const match = await bcrypt.compare(pass, user?.password);

    if (match) {
      const payload = { email: user.email, userId: user._id };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token
      };
    }
    throw new UnauthorizedException();
  }
}
