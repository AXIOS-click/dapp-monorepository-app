import { Button } from "@/shared/application/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/application/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/application/components/ui/table";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import {
  downloadMessagesExcel,
  IMessageResponse,
} from "../../infrastructure/messageService";
import { QueryParams } from "../hooks/useMessage";

export function MessagesTable({
  startDate,
  endDate,
  onPageChange,
  onLimitChange,
  data,
  isLoading,
  isError,
  page,
  limit,
  startTime,
  endTime,
  ...rest
}: Readonly<
  QueryParams & {
    onPageChange: (newPage: number) => void;
    onLimitChange: (newLimit: number) => void;
    data: IMessageResponse;
    isLoading: boolean;
    isError: boolean;
  }
>) {
  const [isDownloading, setIsDownloading] = useState(false);
  const variableHeaders = useMemo(() => {
    const allVariableNames = new Set<string>();
    data?.data?.forEach((message) => {
      message.variables.forEach((variable) => {
        allVariableNames.add(variable.name);
      });
    });
    return Array.from(allVariableNames);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>No se encontró datos para tu búsqueda</div>;

  const handleDownload = async () => {
    setIsDownloading(true);
    const params = {
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
      endDate: endDate
        ? format(endDate, "yyyy-MM-dd")
        : startDate
        ? format(startDate, "yyyy-MM-dd")
        : undefined,
      page,
      limit: limit ?? data?.totalRecords,
      startTime,
      endTime,
      ...rest,
    };

    try {
      await downloadMessagesExcel(params);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false); // 3. Finalizar descarga
    }
  };

  return (
    <>
      <div className="flex justify-start mb-2">
        <Button onClick={handleDownload}>
          {isDownloading ? "Descargando..." : "Download Excel"}
        </Button>
      </div>
      <Table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-48 min-w-48">Timestamp</TableHead>
            {variableHeaders?.map((variableName, i) => (
              <TableHead key={`${variableName}-${i}`}>
                {variableName ?? ""}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data?.data?.map((message, index) => (
            <TableRow
              key={`${message?.timestamp}-${index}`}
              className="hover:bg-gray-50"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="w-48 min-w-48">
                {format(new Date(message?.timestamp), "dd/MM/yyyy HH:mm:ss a")}
              </TableCell>
              {variableHeaders?.map((variableName, i) => {
                const variable = message?.variables?.find(
                  (v) => v.name === variableName
                );
                return (
                  <TableCell key={`${variableName}-${i}`}>
                    {variable ? variable.value : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow className="bg-white !text-gray-900 hover:bg-white border-y-2 border">
            <TableCell
              colSpan={10 + variableHeaders?.length}
              className="px-4 py-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 !hover:bg-white">
                  Mostrando {data?.data?.length} de {data?.totalRecords}
                </span>
                <div className="flex items-center space-x-2">
                  <Select
                    value={limit!.toString()}
                    onValueChange={(value) => onLimitChange(parseInt(value))}
                  >
                    <SelectTrigger className="w-16 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="1000">1000</SelectItem>
                      <SelectItem
                        value={data?.totalRecords?.toString() ?? "50"}
                      >
                        All
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => onPageChange(page! - 1)}
                    disabled={page === 1}
                    variant="outline"
                    className="text-gray-600 px-3 py-1"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => onPageChange(page! + 1)}
                    disabled={page === data?.totalPages}
                    variant="outline"
                    className="text-gray-600 px-3 py-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
