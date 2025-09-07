import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: AuthDTO) {
    // generate hash password
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },

        // only return this
        select: {
          email: true,
          id: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }

    // save new user in db
  }
  async login(dto: AuthDTO) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception

    if (!user) throw new ForbiddenException('Credentials incorrect');

    //compare password
    const passwordMatch = await argon.verify(user.hash, dto.password);
    //if password incorrect throw exception
    if (!passwordMatch) throw new ForbiddenException('Credentials Incorrect');

    //send back the user

    return user;
  }
}
