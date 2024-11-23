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

export async function downloadMessagesExcel(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>
): Promise<void> {
  try {
    const response = await BaseService.get("/ms-core/messages/download", {
      params,
      responseType: "blob", // Important for handling binary data
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Extract filename from content-disposition header if available
    // let filename = "messages.xlsx";
    // const disposition = response.headers["content-disposition"];
    // if (disposition && disposition.indexOf("attachment") !== -1) {
    //   const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    //   const matches = filenameRegex.exec(disposition);
    //   if (matches != null && matches[1]) {
    //     filename = matches[1].replace(/['"]/g, "");
    //   }
    // }

    // Create a temporary link element and trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",

      `${params.startDate}-${params.endDate}.xlsx`
    );

    // Append to the DOM and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    return;
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    throw error;
  }
}
