import { useQuery } from "@tanstack/react-query";
import { downloadMessagesExcel } from "../../infrastructure/messageService";

export interface QueryParams {
  startDate?: string | Date;
  endDate?: string | Date;
  companyCodeId?: string;
  subCompanyCodeId?: string;
  machineId?: string;
  areaId?: string;
  plcId?: string;
  lineaId?: string;
  eventoId?: string;
  page?: number;
  limit?: number;
}

export function useDownloadMessages(queryParams: QueryParams) {
  const messagesQuery = useQuery({
    queryKey: ["messages", queryParams],
    queryFn: () => downloadMessagesExcel(queryParams),
    retry: 2,
  });

  return messagesQuery;
}
