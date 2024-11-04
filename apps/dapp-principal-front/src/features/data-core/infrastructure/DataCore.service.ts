import BaseService from "@/shared/infrastructure/services/BaseService";
import { IDataCore } from "../domain/entities/dataCore.entity";

export async function getConfigSchematics(): Promise<IDataCore> {
  const response = await BaseService.get<IDataCore>(
    "/ms-core/core-data/config-schematics"
  );
  return response.data;
}
