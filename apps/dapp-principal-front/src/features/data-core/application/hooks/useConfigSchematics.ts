/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IDataCore } from "../../domain/entities/dataCore.entity";
import { getConfigSchematics } from "../../infrastructure/DataCore.service";
import { DataCoreStore } from "../stores/DataCoreStore";

export function useConfigSchematics() {
  const { setConfigSchematics, allConfigSchematics } = DataCoreStore();
  const schematicsGetted = useQuery<IDataCore>({
    queryKey: ["configChematics"],
    queryFn: getConfigSchematics,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  }) as any;

  useEffect(() => {
    if (schematicsGetted.isSuccess && schematicsGetted.data) {
      setConfigSchematics(schematicsGetted.data);
    }
  }, [schematicsGetted.isSuccess, schematicsGetted.data, setConfigSchematics]);

  return allConfigSchematics;
}
