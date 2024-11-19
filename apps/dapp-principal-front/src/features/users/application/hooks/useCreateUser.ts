import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../infrastructure/services/UserServices";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-getted"] });
    },
    onError: (error) => {
      console.error("Error al crear el usuario:", error);
      alert("Hubo un problema al crear el usuario. Inténtelo nuevamente.");
    },
  });
}
