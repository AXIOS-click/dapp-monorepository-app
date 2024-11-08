import { useQuery } from "@tanstack/react-query";
import {
  getMessages,
  IMessageResponse,
} from "../../infrastructure/messageService";

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

export function useMessages(queryParams: QueryParams) {
  const messagesQuery = useQuery<IMessageResponse>({
    queryKey: ["messages", queryParams],
    queryFn: () => getMessages(queryParams),
    retry: 2,
  });

  return messagesQuery;
}
