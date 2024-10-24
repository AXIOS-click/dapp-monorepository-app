import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Conexión a la base de datos establecida exitosamente.');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      process.exit(1);
    }
  }
}
