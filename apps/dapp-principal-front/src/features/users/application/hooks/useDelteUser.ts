import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../infrastructure/services/UserServices";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string }) => deleteUser(variables.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-getted"] });
    },
    onError: (error) => {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un problema al eliminar el usuario. Inténtelo nuevamente.");
    },
  });
}
