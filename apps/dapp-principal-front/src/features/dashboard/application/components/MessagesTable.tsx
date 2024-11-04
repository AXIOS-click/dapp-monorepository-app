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
import { useMemo } from "react";
import { QueryParams, useMessages } from "../hooks/useMessage";

export function MessagesTable({
  startDate,
  endDate,
  page = 1,
  limit = 10,
  onPageChange,
  onLimitChange,
  ...rest
}: Readonly<
  QueryParams & {
    onPageChange: (newPage: number) => void;
    onLimitChange: (newLimit: number) => void;
  }
>) {
  const { data, isLoading, isError } = useMessages({
    startDate:
      typeof startDate === "string"
        ? startDate
        : startDate?.toISOString() ?? new Date().toISOString(),
    endDate:
      typeof endDate === "string"
        ? endDate
        : endDate?.toISOString() ?? new Date().toISOString(),
    page,
    limit,
    ...rest,
  });
  const variableHeaders = useMemo(() => {
    const allVariableNames = new Set<string>();
    data?.data.forEach((message) => {
      message.variables.forEach((variable) => {
        allVariableNames.add(variable.name);
      });
    });
    return Array.from(allVariableNames);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>No se encontró datos para tu búsqueda</div>;

  return (
    <Table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>SubCompany</TableHead>
          <TableHead>Machine</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>PLC</TableHead>
          <TableHead>Line</TableHead>
          {variableHeaders.map((variableName, i) => (
            <TableHead key={`${variableName}-${i}`} className="bg-gray-200">
              {variableName ?? ""}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {data?.data.map((message, index) => (
          <TableRow
            key={`${message.timestamp}-${index}`}
            className="hover:bg-gray-50"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {format(new Date(message.timestamp), "dd/MM/yyyy HH:mm")}
            </TableCell>
            <TableCell>{message.evento.name}</TableCell>
            <TableCell>{message.company.name}</TableCell>
            <TableCell>{message.subCompany.name}</TableCell>
            <TableCell>{message.machine.name}</TableCell>
            <TableCell>{message.area.name}</TableCell>
            <TableCell>{message.plc.name}</TableCell>
            <TableCell>{message.linea.name}</TableCell>
            {variableHeaders.map((variableName, i) => {
              const variable = message.variables.find(
                (v) => v.name === variableName
              );
              return (
                <TableCell key={`${variableName}-${i}`} className="bg-gray-100">
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
            colSpan={10 + variableHeaders.length}
            className="px-4 py-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 !hover:bg-white">
                Mostrando {data?.data.length} de {data?.totalRecords}
              </span>
              <div className="flex items-center space-x-2">
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => onLimitChange(parseInt(value))}
                >
                  <SelectTrigger className="w-16 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value={data?.totalRecords.toString() ?? "50"}>
                      All
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
                  variant="outline"
                  className="text-gray-600 px-3 py-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => onPageChange(page + 1)}
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
  );
}
