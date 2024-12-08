"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/application/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/shared/application/components/ui/chart";
import { IMessageResponse } from "../../infrastructure/messageService";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarGraph({ data }: { data: IMessageResponse }) {
  const toChart: Record<string, unknown>[] = React.useMemo(() => {
    const chartData = data?.data.map((message) => {
      const chart: Record<string, string | number> = {
        fecha: message.timestamp,
      };
      message.variables.forEach((variable) => {
        const value = Number(variable.value);
        if (!isNaN(value)) {
          chart[variable.name] = value;
        }
      });
      return chart;
    });
    return chartData ?? [];
  }, [data]);

  const variableNames = React.useMemo(() => {
    if (toChart.length === 0) return [];
    const keys = new Set<string>();
    toChart.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "fecha") {
          keys.add(key);
        }
      });
    });
    return Array.from(keys);
  }, [toChart]);

  const [selectedVariables, setSelectedVariables] = React.useState<string[]>(
    []
  );

  const toggleVariable = (variableName: string) => {
    setSelectedVariables((prev) =>
      prev.includes(variableName)
        ? prev.filter((v) => v !== variableName)
        : [...prev, variableName]
    );
  };

  const colorPalette = [
    "#39ADD4",
    "#2E83E8",
    "#C98334",
    "#2A0F08",
    "#66509E",
    "#08CE02",
    "#E754F7",
    "#1EF1B2",
    "#7C8518",
    "#F412E2",
    "#142504",
    "#D6B37B",
    "#380320",
    "#1DE7E2",
    "#1AFACF",
    "#F8FB83",
    "#30C4C5",
    "#4F730C",
    "#AA77C2",
    "#25EAEC",
    "#666F04",
    "#0B6A27",
    "#F1BDB7",
    "#B5317F",
    "#2CD61F",
    "#60F848",
    "#184896",
    "#888551",
    "#2AB005",
    "#BAB5CD",
    "#F5FA01",
    "#DED885",
    "#EF0B12",
    "#5ACA10",
    "#094FB0",
    "#4B2B08",
    "#3F77F2",
    "#D80691",
    "#ED2B0D",
    "#60D879",
    "#F8EBF3",
    "#585464",
    "#AB9838",
    "#1E09A2",
    "#15844A",
    "#B6EF96",
    "#18B4FF",
    "#E08802",
    "#F9DCB7",
    "#8B4C71",
    "#DA6840",
    "#54893F",
    "#48A537",
    "#8CEBD6",
    "#C8187C",
    "#0720F9",
    "#9A77FC",
    "#FA0082",
    "#20A952",
    "#5035CB",
    // Agrega más colores si es necesario
  ];

  const getColor = (variableName: string) => {
    const index = variableNames.indexOf(variableName);
    return colorPalette[index % colorPalette.length];
  };
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Grafica de analisis</CardTitle>
          {/* <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription> */}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <LineChart
            data={toChart}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString("es-ES", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
              }}
            />
            <YAxis />
            <Tooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {selectedVariables.map((variableName) => (
              <Line
                key={variableName}
                type="monotone"
                dataKey={variableName}
                stroke={getColor(variableName)} // Puedes usar una función para asignar colores
                strokeWidth={1}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {variableNames.map((variableName) => (
            <button
              key={variableName}
              onClick={() => toggleVariable(variableName)}
              className={`px-3 py-1 text-sm rounded-md shadow-sm transition-all duration-200 ${
                selectedVariables.includes(variableName)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {variableName}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
