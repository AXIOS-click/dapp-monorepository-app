import BaseService from "@/shared/infrastructure/services/BaseService";
import { IUserBase } from "../../domain/entities/User";

export async function getAllUsers(): Promise<IUserBase[]> {
  const response = await BaseService.get<IUserBase[]>(
    "/ms-authorization/users"
  );
  return response.data;
}
