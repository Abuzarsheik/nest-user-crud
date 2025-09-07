import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: AuthDTO) {
    console.log(Object.keys(this.prisma));

    // generate hash password
    const hash = await argon.hash(dto.password);

    // save new user in db

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    return user;
  }
  login() {
    return 'sing in confirmed';
  }
}
