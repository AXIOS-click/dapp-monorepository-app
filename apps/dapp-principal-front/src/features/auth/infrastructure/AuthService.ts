import BaseService from "@/shared/infrastructure/services/BaseService";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export async function login(
  credentials: LoginCredentials
): Promise<ILoginResponse> {
  const response = await BaseService.post<ILoginResponse>(
    "/ms-authorization/auth/login",
    credentials
  );
  return response.data;
}
