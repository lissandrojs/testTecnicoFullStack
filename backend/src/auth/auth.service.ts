import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findById(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, name: user.name };
    const token = {
      token: await this.jwtService.signAsync(payload),
    };

    return token;
  }
}
