import BaseService from "@/shared/infrastructure/services/BaseService";

export interface IMessage {
  timestamp: string;
  evento: { name: string };
  company: { name: string };
  subCompany: { name: string };
  machine: { name: string };
  area: { name: string };
  plc: { name: string };
  linea: { name: string };
  variables: Array<{ name: string; value: string }>;
}

export interface IMessageResponse {
  data: IMessage[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export async function getMessages(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>
): Promise<IMessageResponse> {
  const response = await BaseService.get<IMessageResponse>(
    "/ms-core/messages",
    {
      params,
    }
  );
  return response.data;
}
