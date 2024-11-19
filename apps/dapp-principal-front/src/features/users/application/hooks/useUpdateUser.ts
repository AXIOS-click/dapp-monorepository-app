import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewUser } from "../../domain/entities/User";
import { updateUser } from "../../infrastructure/services/UserServices";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: Partial<INewUser> }) =>
      updateUser(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-getted"] });
    },
    onError: (error) => {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar el usuario. Inténtelo nuevamente.");
    },
  });
}
