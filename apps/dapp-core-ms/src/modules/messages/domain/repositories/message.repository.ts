import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MessageRepositoryImpl {
  constructor(private readonly prisma: PrismaService) {}
  async findMessages(filters: any, page: number, limit: number | string) {
    // validar si limit es o no numero y si no lo es convertirlo a numero
    let convertedLimit;

    if (typeof limit === 'string') {
      convertedLimit = parseInt(limit, 10);
    } else {
      convertedLimit = limit;
    }

    const skip = (page - 1) * convertedLimit;
    // Consulta principal con filtros y paginación
    const messages = await this.prisma.message.findMany({
      where: filters,
      skip,
      take: convertedLimit,
      orderBy: {
        timestamp: 'desc', // Orden descendente por timestamp
      },
      select: {
        timestamp: true,
        evento: { select: { name: true } },
        company: { select: { name: true } },
        subCompany: { select: { name: true } },
        machine: { select: { name: true } },
        area: { select: { name: true } },
        plc: { select: { name: true } },
        linea: { select: { name: true } },
        variables: { select: { name: true, value: true } },
      },
    });

    // Obtener el total de registros que coinciden con los filtros
    const totalRecords = await this.prisma.message.count({ where: filters });

    return {
      data: messages,
      totalRecords,
      totalPages: Math.ceil(totalRecords / convertedLimit),
      currentPage: page,
    };
  }
}
