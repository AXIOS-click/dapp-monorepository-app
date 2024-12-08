import { DataCoreStore } from "@/features/data-core/application/stores/DataCoreStore";
import { MessagesTable } from "./MessagesTable";

import { Button } from "@/shared/application/components/ui/button";
import { Calendar } from "@/shared/application/components/ui/calendar";
import { Card, CardContent } from "@/shared/application/components/ui/card";
import { Label } from "@/shared/application/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/application/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/application/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/application/components/ui/tabs";
import { cn } from "@/shared/application/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useMessages } from "../hooks/useMessage";
import { TabOverview } from "./TabOverview";

export const TabAnalytics = () => {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { allConfigSchematics } = DataCoreStore();
  const startDate = new Date();
  startDate.setMonth(new Date().getMonth() - 1);
  const [queryParams, setQueryParams] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
    companyCodeId: string;
    subCompanyCodeId: string;
    machineId: string;
    areaId: string;
    plcId: string;
    lineaId: string;
    eventoId: string;
    page: number;
    limit: number;
    startTime: string;
    endTime: string;
  }>({
    startDate: undefined,
    endDate: undefined,
    companyCodeId: "",
    subCompanyCodeId: "",
    machineId: "",
    areaId: "",
    plcId: "",
    lineaId: "",
    eventoId: "",
    page: 1,
    limit: 15,
    startTime: "00:00:00",
    endTime: "23:59:00",
  });
  const [executeSearch, setExecuteSearch] = useState(false);

  const handleSearch = () => {
    // if (!queryParams.startDate) {
    //   return;
    // }
    setExecuteSearch(true);
  };

  const handleInputChange = (
    name: string,
    value: string | number | undefined
  ) => {
    if (value === undefined) return;

    setQueryParams((prev) => {
      const updatedParams = { ...prev, [name]: value };

      const { startDate, endDate } = updatedParams;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffInMonths =
          end.getFullYear() * 12 +
          end.getMonth() -
          (start.getFullYear() * 12 + start.getMonth());
        if (
          diffInMonths > 1 ||
          (diffInMonths === 1 && end.getDate() > start.getDate())
        ) {
          return prev;
        }
      }
      setExecuteSearch(false);

      return updatedParams;
    });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
    setExecuteSearch(true);
  };

  const handleLimitChange = (newLimit: number) => {
    setQueryParams((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    setExecuteSearch(true);
  };

  useEffect(() => {
    const { machineId, areaId, lineaId, eventoId } = queryParams;

    const complete =
      Boolean(machineId) &&
      Boolean(areaId) &&
      Boolean(lineaId) &&
      Boolean(eventoId);

    setIsFormComplete(complete);
  }, [queryParams]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    setQueryParams((prev) => ({
      ...prev,
      startDate: range?.from,
      endDate: range?.to,
    }));
  };

  const isEnabled: boolean = !!(
    executeSearch &&
    queryParams.startDate &&
    queryParams.endDate
  );

  const { data, isLoading, isError } = useMessages(
    {
      startDate: queryParams.startDate
        ? format(queryParams.startDate, "yyyy-MM-dd")
        : undefined,
      endDate: queryParams.endDate
        ? format(queryParams.endDate, "yyyy-MM-dd")
        : undefined,
      companyCodeId: queryParams.companyCodeId,
      subCompanyCodeId: queryParams.subCompanyCodeId,
      machineId: queryParams.machineId,
      areaId: queryParams.areaId,
      plcId: queryParams.plcId,
      lineaId: queryParams.lineaId,
      eventoId: queryParams.eventoId,
      page: queryParams.page,
      limit: queryParams.limit,
      startTime: queryParams.startTime ?? "00:00:00",
      endTime: queryParams.endTime ?? "23:59:59",
    },
    isEnabled
  );

  useEffect(() => {
    if (data || isError) {
      setExecuteSearch(false); // Resetea el estado para futuras búsquedas
    }
  }, [data, isError]);

  return (
    <div className="mx-auto">
      <Card className=" lg:top-4 lg:self-start">
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold mb-4">Filtros</h2>
          <Tabs defaultValue="dates" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dates">
                Fechas{" "}
                {!queryParams.startDate || !queryParams.endDate ? (
                  <span className="text-red-500">*</span>
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="machine">
                Máquinas{" "}
                {!queryParams.machineId ||
                !queryParams.areaId ||
                !queryParams.lineaId ? (
                  <span className="text-red-500">*</span>
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="other">
                Eventos{" "}
                {!queryParams.lineaId || !queryParams.eventoId ? (
                  <span className="text-red-500">*</span>
                ) : null}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dates" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !queryParams.startDate && "text-muted-foreground"
                        )}
                      >
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        captionLayout="dropdown"
                        max={32}
                        min={0}
                        mode="range"
                        numberOfMonths={2}
                        showOutsideDays
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Hora de Inicio</Label>
                    <input
                      id="startTime"
                      type="time"
                      className="w-full border rounded-md p-2"
                      value={queryParams.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Hora de Fin</Label>
                    <input
                      id="endTime"
                      type="time"
                      className="w-full border rounded-md p-2"
                      value={queryParams.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="machine" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="machineId">ID de Máquina</Label>
                  <Select
                    value={queryParams.machineId}
                    onValueChange={(value) =>
                      handleInputChange("machineId", value)
                    }
                  >
                    <SelectTrigger id="machineId">
                      <SelectValue placeholder="Selecciona una máquina" />
                    </SelectTrigger>
                    <SelectContent>
                      {allConfigSchematics?.machineIds.map((machine) => (
                        <SelectItem key={machine.id} value={machine.id}>
                          {machine.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaId">ID de Área</Label>
                  <Select
                    value={queryParams.areaId}
                    onValueChange={(value) =>
                      handleInputChange("areaId", value)
                    }
                  >
                    <SelectTrigger id="areaId">
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      {allConfigSchematics?.areas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* <div className="space-y-2">
                  <Label htmlFor="plcId">ID de PLC</Label>
                  <Select
                    value={queryParams.plcId}
                    onValueChange={(value) => handleInputChange("plcId", value)}
                  >
                    <SelectTrigger id="plcId">
                      <SelectValue placeholder="Selecciona un PLC" />
                    </SelectTrigger>
                    <SelectContent>
                      {allConfigSchematics?.plcs.map((plc) => (
                        <SelectItem key={plc.id} value={plc.id}>
                          {plc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="lineaId">ID de Línea</Label>
                  <Select
                    value={queryParams.lineaId}
                    onValueChange={(value) =>
                      handleInputChange("lineaId", value)
                    }
                  >
                    <SelectTrigger id="lineaId">
                      <SelectValue placeholder="Selecciona una línea" />
                    </SelectTrigger>
                    <SelectContent>
                      {allConfigSchematics?.lineas.map((linea) => (
                        <SelectItem key={linea.id} value={linea.id}>
                          {linea.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="eventoId">ID de Evento</Label>
                <Select
                  value={queryParams.eventoId}
                  onValueChange={(value) =>
                    handleInputChange("eventoId", value)
                  }
                >
                  <SelectTrigger id="eventoId">
                    <SelectValue placeholder="Selecciona un evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {allConfigSchematics?.eventos.map((evento) => (
                      <SelectItem key={evento.id} value={evento.id}>
                        {evento.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          {/* <Button
            className="w-full mt-4"
            disabled={!isFormComplete}
            onClick={() => setQueryParams({ ...queryParams })} // Realizar consulta al cambiar queryParams
          >
            Consultar Mensajes
          </Button> */}
        </CardContent>
        <Button
          className="w-full mt-4"
          disabled={!isFormComplete}
          onClick={handleSearch} // Ejecutar búsqueda manualmente
        >
          Buscar
        </Button>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-4">
          {isFormComplete && (
            <Tabs defaultValue="analytics" className="space-y-4">
              <TabsList>
                <TabsTrigger value="analytics">
                  Consultas y analisis
                </TabsTrigger>
                <TabsTrigger value="overview">Graficas y resumen</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <TabOverview data={data!} />
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <MessagesTable
                  startDate={queryParams.startDate}
                  endDate={queryParams.endDate}
                  companyCodeId={queryParams.companyCodeId}
                  subCompanyCodeId={queryParams.subCompanyCodeId}
                  machineId={queryParams.machineId}
                  areaId={queryParams.areaId}
                  plcId={queryParams.plcId}
                  lineaId={queryParams.lineaId}
                  eventoId={queryParams.eventoId}
                  page={queryParams.page}
                  limit={queryParams.limit}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                  data={data!}
                  isLoading={isLoading}
                  isError={isError}
                  startTime={queryParams.startTime}
                  endTime={queryParams.endTime}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
