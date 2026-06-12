import { Controller } from '@nestjs/common';
import type { AuthService } from './auth.service';
import type { Registerdto } from 'src/users/dto/Registerdto';
import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import type { loginDto } from 'src/users/dto/logindto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }
}
