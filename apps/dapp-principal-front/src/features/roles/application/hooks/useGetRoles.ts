import { useQuery } from "@tanstack/react-query";
import { IRoleBase } from "../../domain/entities/Roles";
import { getRoles } from "../../infrastructure/RoleService";

export function useRoles() {
  return useQuery<IRoleBase[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
