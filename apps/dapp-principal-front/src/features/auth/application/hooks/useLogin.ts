import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import {
  ILoginResponse,
  login,
  LoginCredentials,
} from "../../infrastructure/AuthService";

interface DecodedToken {
  sub: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

export function useLogin() {
  const { setUserSession, toggleSignedUser, setTokenSession } = AuthStore();

  return useMutation<ILoginResponse, unknown, LoginCredentials, unknown>({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      console.log("data", data);
      setTokenSession(data.access_token);

      const decodedToken: DecodedToken = jwtDecode(data.access_token);

      const user = {
        id: decodedToken.sub,
        email: decodedToken.email,
        roles: decodedToken.roles,
      };

      setUserSession(user);
      toggleSignedUser();
    },
  });
}
