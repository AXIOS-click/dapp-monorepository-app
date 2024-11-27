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
  startTime?: string;
  endTime?: string;
}

export function useMessages(queryParams: QueryParams | null, enabled: boolean) {
  const sanitizedParams = queryParams
    ? Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined)
      )
    : {};

  const messagesQuery = useQuery<IMessageResponse>({
    queryKey: ["messages", sanitizedParams],
    queryFn: () => getMessages(sanitizedParams ?? {}),
    enabled,
    retry: 2,
  });

  return messagesQuery;
}
