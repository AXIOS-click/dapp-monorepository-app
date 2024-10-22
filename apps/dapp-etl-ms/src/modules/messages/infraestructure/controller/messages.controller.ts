import { Controller, Get, Query } from '@nestjs/common';
import { SaveMessageUseCase } from '../../application/use-cases/save-message.use-case';

@Controller('messages')
export class MessagesController {
  constructor(private readonly saveMessageUseCase: SaveMessageUseCase) {}

  @Get()
  async getMessages(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('companyCodeId') companyCodeId?: string,
    @Query('subCompanyCodeId') subCompanyCodeId?: string,
    @Query('machineId') machineId?: string,
    @Query('areaId') areaId?: string,
    @Query('plcId') plcId?: string,
    @Query('lineaId') lineaId?: string,
    @Query('eventoId') eventoId?: string,
  ) {
    const filters = {
      ...(startDate &&
        endDate && {
          timestamp: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      ...(companyCodeId && { companyCodeId }),
      ...(subCompanyCodeId && { subCompanyCodeId }),
      ...(machineId && { machineId }),
      ...(areaId && { areaId }),
      ...(plcId && { plcId }),
      ...(lineaId && { lineaId }),
      ...(eventoId && { eventoId }),
    };

    return this.saveMessageUseCase.getMessagesByFilters(filters);
  }
}
