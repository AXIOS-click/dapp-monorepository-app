import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IRoleBase } from "../../domain/entities/Roles";
import { getRoles } from "../../infrastructure/RoleService";
import { RolesStore } from "../stores/RolesStore";

export function useRoles() {
  const { setRoles } = RolesStore();
  const rolesGetted = useQuery<IRoleBase[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    if (rolesGetted.isSuccess && rolesGetted.data) {
      console.log(rolesGetted.data, "rolesGetted");
      setRoles(rolesGetted.data);
    }
  }, [rolesGetted.isSuccess, rolesGetted.data, setRoles]);
}
