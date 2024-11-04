import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/messages/domain/repositories/prisma.service';

@Injectable()
export class DataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllData() {
    const companyCodes = await this.prisma.companyCode.findMany({
      select: { id: true, name: true },
    });
    const subCompanyCodes = await this.prisma.subCompanyCode.findMany({
      select: { id: true, name: true },
    });
    const machineIds = await this.prisma.machineId.findMany({
      select: { id: true, name: true },
    });
    const areas = await this.prisma.area.findMany({
      select: { id: true, name: true },
    });
    const plcs = await this.prisma.plc.findMany({
      select: { id: true, name: true },
    });
    const lineas = await this.prisma.linea.findMany({
      select: { id: true, name: true },
    });
    const eventos = await this.prisma.evento.findMany({
      select: { id: true, name: true },
    });

    return {
      companyCodes,
      subCompanyCodes,
      machineIds,
      areas,
      plcs,
      lineas,
      eventos,
    };
  }
}
