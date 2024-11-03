import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { login, LoginCredentials } from "../../infrastructure/AuthService";

export function useLogin() {
  const { setUserSession, toggleSignedUser, setTokenSession } = AuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      setUserSession(data.user);
      setTokenSession(data.token);
      toggleSignedUser();
    },
  });
}
