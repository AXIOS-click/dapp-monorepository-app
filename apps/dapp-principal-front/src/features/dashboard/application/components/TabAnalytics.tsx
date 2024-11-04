import { MessagesTable } from "./MessagesTable";

import { Button } from "@/shared/application/components/ui/button";
import { Calendar } from "@/shared/application/components/ui/calendar";
import { Card, CardContent } from "@/shared/application/components/ui/card";
import { Input } from "@/shared/application/components/ui/input";
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
import { useState } from "react";

export const TabAnalytics = () => {
  const startDate = new Date();
  startDate.setMonth(new Date().getMonth() - 1);

  console.log("startDate", startDate);
  const [queryParams, setQueryParams] = useState({
    startDate,
    endDate: new Date(),
    companyCodeId: "",
    subCompanyCodeId: "",
    machineId: "",
    areaId: "",
    plcId: "",
    lineaId: "",
    eventoId: "",
    page: 1,
    limit: 10,
  });

  const handleInputChange = (
    name: string,
    value: string | number | undefined
  ) => {
    if (value === undefined) return;
    setQueryParams((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setQueryParams((prev) => ({ ...prev, limit: newLimit, page: 1 })); // Reset page to 1 when limit changes
  };

  return (
    <div className="container mx-auto">
      <Card className="lg:sticky lg:top-4 lg:self-start">
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold mb-4">Filtros</h2>
          <Tabs defaultValue="dates" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dates">Fechas</TabsTrigger>
              {/* <TabsTrigger value="company">Compañía</TabsTrigger>
              <TabsTrigger value="machine">Máquina</TabsTrigger>
              <TabsTrigger value="other">Otros</TabsTrigger> */}
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
                        {queryParams.startDate ? (
                          format(queryParams.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={queryParams.startDate}
                        onSelect={(date) =>
                          handleInputChange("startDate", date?.toISOString())
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !queryParams.endDate && "text-muted-foreground"
                        )}
                      >
                        {queryParams.endDate ? (
                          format(queryParams.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={queryParams.endDate}
                        onSelect={(date) =>
                          handleInputChange("endDate", date?.toISOString())
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="company" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyCodeId">Código de Compañía</Label>
                  <Input
                    id="companyCodeId"
                    value={queryParams.companyCodeId}
                    onChange={(e) =>
                      handleInputChange("companyCodeId", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subCompanyCodeId">
                    Código de Subcompañía
                  </Label>
                  <Input
                    id="subCompanyCodeId"
                    value={queryParams.subCompanyCodeId}
                    onChange={(e) =>
                      handleInputChange("subCompanyCodeId", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="machine" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="machineId">ID de Máquina</Label>
                  <Input
                    id="machineId"
                    value={queryParams.machineId}
                    onChange={(e) =>
                      handleInputChange("machineId", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaId">ID de Área</Label>
                  <Input
                    id="areaId"
                    value={queryParams.areaId}
                    onChange={(e) =>
                      handleInputChange("areaId", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plcId">ID de PLC</Label>
                  <Input
                    id="plcId"
                    value={queryParams.plcId}
                    onChange={(e) => handleInputChange("plcId", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lineaId">ID de Línea</Label>
                  <Input
                    id="lineaId"
                    value={queryParams.lineaId}
                    onChange={(e) =>
                      handleInputChange("lineaId", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="eventoId">ID de Evento</Label>
                <Input
                  id="eventoId"
                  value={queryParams.eventoId}
                  onChange={(e) =>
                    handleInputChange("eventoId", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="page">Página</Label>
                  <Input
                    id="page"
                    type="number"
                    value={queryParams.page}
                    onChange={(e) =>
                      handleInputChange("page", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Límite</Label>
                  <Select
                    value={queryParams.limit.toString()}
                    onValueChange={(value) =>
                      handleInputChange("limit", parseInt(value))
                    }
                  >
                    <SelectTrigger id="limit">
                      <SelectValue placeholder="Selecciona un límite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          {/* <Button
            className="w-full mt-4"
            onClick={() => setQueryParams({ ...queryParams })} // Realizar consulta al cambiar queryParams
          >
            Consultar Mensajes
          </Button> */}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-4">
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
          />
        </CardContent>
      </Card>
    </div>
  );
};
