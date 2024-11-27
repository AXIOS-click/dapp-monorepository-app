import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MessageRepositoryImpl {
  constructor(private readonly prisma: PrismaService) {}
  async findOrCreate(entity: string, value: string) {
    if (!value) {
      throw new Error(`Name is required for entity: ${entity}`);
    }
    try {
      const existingRecord = await this.prisma[entity].findUnique({
        where: { name: value },
      });
      if (existingRecord) {
        return existingRecord;
      } else {
        return await this.prisma[entity].create({
          data: { name: value },
        });
      }
    } catch (error) {
      console.error(
        `Error in upsert for entity ${entity}: ${value}, error: ${error}`,
      );
      throw new Error(`Could not create or find ${entity}: ${value}`);
    }
  }
  async createMessage(data: any) {
    return this.prisma.message.create({ data });
  }
  async saveErrorLog(content: string, error: string) {
    try {
      await this.prisma.$runCommandRaw({
        insert: 'ErrorLog',
        documents: [{ content, error, timestamp: new Date() }],
      });
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }

  async findMessages(filters: any) {
    return this.prisma.message.findMany({
      where: filters,
      select: {
        timestamp: true,
        evento: {
          select: {
            name: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
        subCompany: {
          select: {
            name: true,
          },
        },
        machine: {
          select: {
            name: true,
          },
        },
        area: {
          select: {
            name: true,
          },
        },
        plc: {
          select: {
            name: true,
          },
        },
        linea: {
          select: {
            name: true,
          },
        },
        variables: {
          select: {
            name: true,
            value: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc', // Ordenamos por fecha descendente
      },
    });
  }
}
