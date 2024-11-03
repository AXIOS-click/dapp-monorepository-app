/* eslint-disable @typescript-eslint/no-explicit-any */
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
  }) as any;

  useEffect(() => {
    if (rolesGetted.isSuccess && rolesGetted.data) {
      setRoles(rolesGetted.data.data);
    }
  }, [rolesGetted.isSuccess, rolesGetted.data, setRoles]);
}
