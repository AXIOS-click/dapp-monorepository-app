import BaseService from "@/shared/infrastructure/services/BaseService";
import { IRoleBase } from "../domain/entities/Roles";

export async function getRoles(): Promise<IRoleBase[]> {
  const response = await BaseService.get<IRoleBase[]>("/ms-authorization/role");
  return response.data;
}
