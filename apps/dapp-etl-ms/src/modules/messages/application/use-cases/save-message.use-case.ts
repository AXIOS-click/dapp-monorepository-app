import { Injectable } from '@nestjs/common';
import { MessageRepositoryImpl } from '../../domain/repositories/message.repository';

@Injectable()
export class SaveMessageUseCase {
  constructor(private readonly messageRepository: MessageRepositoryImpl) {}

  async execute(message: any) {
    const { d, ts } = message;

    // Validar o crear entidades relacionadas
    const company = await this.messageRepository.findOrCreate(
      'companyCode',
      d.companyCode,
    );
    const subCompany = await this.messageRepository.findOrCreate(
      'subCompanyCode',
      d.subCompanyCode,
    );
    const machine = await this.messageRepository.findOrCreate(
      'machineId',
      d.machineId,
    );
    const area = await this.messageRepository.findOrCreate('area', d.area);
    const plc = await this.messageRepository.findOrCreate(
      'plc',
      'MomentaryPLC',
    );
    const linea = await this.messageRepository.findOrCreate('linea', d.linea);
    const evento = await this.messageRepository.findOrCreate(
      'evento',
      d.evento,
    );
    const utcOffset = 5 * 60;
    const date = new Date(ts);
    const utcDate = new Date(date.getTime() + utcOffset * 60000);

    await this.messageRepository.createMessage({
      timestamp: utcDate,
      companyCodeId: company.id,
      subCompanyCodeId: subCompany.id,
      machineId: machine.id,
      areaId: area.id,
      plcId: plc.id,
      lineaId: linea.id,
      eventoId: evento.id,
      variables: {
        create: Object.entries(d.variables).map(([name, value]) => ({
          name,
          value: value.toString(),
        })),
      },
    });
  }
}
