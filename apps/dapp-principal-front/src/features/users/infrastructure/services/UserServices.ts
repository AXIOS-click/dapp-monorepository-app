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

export async function updateUser(
  id: string,
  data: Partial<INewUser>
): Promise<IUserBase> {
  const response = await BaseService.put<IUserBase>(
    `/ms-authorization/users/${id}`,
    data
  );
  return response.data;
}

export async function deleteUser(id: string): Promise<IUserBase> {
  const response = await BaseService.delete<IUserBase>(
    `/ms-authorization/users/${id}`
  );
  return response.data;
}
