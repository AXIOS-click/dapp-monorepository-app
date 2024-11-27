import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { SaveMessageUseCase } from '../../application/use-cases/save-message.use-case';

@Controller('messages')
export class MessagesController {
  constructor(private readonly saveMessageUseCase: SaveMessageUseCase) {}

  @Get()
  async getMessages(
    @Query('startTime') startTime?: string,
    @Query('endTime') endTime?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('companyCodeId') companyCodeId?: string,
    @Query('subCompanyCodeId') subCompanyCodeId?: string,
    @Query('machineId') machineId?: string,
    @Query('areaId') areaId?: string,
    @Query('plcId') plcId?: string,
    @Query('lineaId') lineaId?: string,
    @Query('eventoId') eventoId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    let startTimestamp: Date | undefined;
    let endTimestamp: Date | undefined;

    if (startDate && startTime) {
      startTimestamp = new Date(`${startDate}T${startTime}`);
    } else if (startDate) {
      startTimestamp = new Date(startDate);
    }

    if (endDate && endTime) {
      endTimestamp = new Date(`${endDate}T${endTime}`);
    } else if (endDate) {
      endTimestamp = new Date(endDate);
    }
    const filters = {
      ...(startDate &&
        endDate && {
          timestamp: {
            gte: startTimestamp,
            lte: endTimestamp,
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

    return this.saveMessageUseCase.getMessagesByFilters(filters, page, limit);
  }
  // res.setHeader(
  //   'Content-Type',
  //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // );
  // res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');

  @Get('download')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename="data.xlsx"')
  async getMessagesDownload(
    @Res() res: Response,
    @Query('startTime') startTime?: string,
    @Query('endTime') endTime?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('companyCodeId') companyCodeId?: string,
    @Query('subCompanyCodeId') subCompanyCodeId?: string,
    @Query('machineId') machineId?: string,
    @Query('areaId') areaId?: string,
    @Query('plcId') plcId?: string,
    @Query('lineaId') lineaId?: string,
    @Query('eventoId') eventoId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    let startTimestamp: Date | undefined;
    let endTimestamp: Date | undefined;

    if (startDate && startTime) {
      startTimestamp = new Date(`${startDate}T${startTime}`);
    } else if (startDate) {
      startTimestamp = new Date(startDate);
    }

    if (endDate && endTime) {
      endTimestamp = new Date(`${endDate}T${endTime}`);
    } else if (endDate) {
      endTimestamp = new Date(endDate);
    }
    const filters = {
      ...(startDate &&
        endDate && {
          timestamp: {
            gte: startTimestamp,
            lte: endTimestamp,
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

    const toCONVERT = await this.saveMessageUseCase.getMessagesByFilters(
      filters,
      page,
      limit,
    );

    // Extract all unique variable names for dynamic columns
    const allVariableNames = new Set<string>();

    toCONVERT.data.forEach((message) => {
      message.variables.forEach((variable) => {
        allVariableNames.add(variable.name);
      });
    });

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Define the columns dynamically
    worksheet.columns = [
      { header: 'Index', key: 'index', width: 10 },
      { header: 'Timestamp', key: 'timestamp', width: 30 },
      ...Array.from(allVariableNames).map((name) => ({
        header: name,
        key: name,
        width: 20,
      })),
    ];

    // Prepare the data rows
    const dataRows = toCONVERT.data.map((message, index) => {
      const timestamp = new Date(message.timestamp);
      const row = {
        index: index + 1,
        timestamp: `${timestamp.getDate().toString().padStart(2, '0')}/${(
          timestamp.getMonth() + 1
        )
          .toString()
          .padStart(
            2,
            '0',
          )}/${timestamp.getFullYear()} ${timestamp.getHours().toString().padStart(2, '0')}:${timestamp
          .getMinutes()
          .toString()
          .padStart(
            2,
            '0',
          )}:${timestamp.getSeconds().toString().padStart(2, '0')}`,
      };

      message.variables.forEach((variable) => {
        row[variable.name] = variable.value;
      });

      return row;
    });

    // Add the data rows to the worksheet
    dataRows.forEach((dataRow) => {
      worksheet.addRow(dataRow);
    });

    // Generate the Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=messages.xlsx');
    // Send the Excel file as the response
    res.end(buffer);
  }
}
