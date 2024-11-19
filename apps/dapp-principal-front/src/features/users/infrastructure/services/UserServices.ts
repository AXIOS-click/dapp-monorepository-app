import BaseService from "@/shared/infrastructure/services/BaseService";
import { INewUser, IUserBase } from "../../domain/entities/User";

export async function getAllUsers(): Promise<IUserBase[]> {
  const response = await BaseService.get<IUserBase[]>(
    "/ms-authorization/users"
  );
  return response.data;
}

export async function createUser(
  data: INewUser & { password: string }
): Promise<IUserBase> {
  const response = await BaseService.post<IUserBase>(
    "/ms-authorization/users",
    data
  );
  return response.data;
}
