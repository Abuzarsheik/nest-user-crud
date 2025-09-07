import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() dto: AuthDTO) {
    return this.authService.register(dto);
  }
  @Post('login')
  login(@Body() dto: AuthDTO) {
    return this.authService.login(dto);
  }
}
