import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import type { Registerdto } from 'src/users/dto/Registerdto';
import type { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { access } from 'fs';
import type { loginDto } from 'src/users/dto/logindto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(logindto: loginDto) {
    const user = await this.usersService.findByEmail(logindto.email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(logindto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
    };
  }
}
