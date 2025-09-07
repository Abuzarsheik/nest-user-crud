import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://neondb_owner:npg_c5JplCmRL3vw@ep-wandering-lake-advg9qk4-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
        },
      },
    });
  }
}
