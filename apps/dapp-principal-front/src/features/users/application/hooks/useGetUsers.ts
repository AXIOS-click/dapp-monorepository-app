import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UsersStore } from "../stores/UsersStore";

import { IUserBase } from "../../domain/entities/User";
import { getAllUsers } from "../../infrastructure/services/UserServices";
export function useGetUsers() {
  const { setUsers } = UsersStore();
  const rolesGetted = useQuery<IUserBase[]>({
    queryKey: ["roles"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  useEffect(() => {
    if (rolesGetted.isSuccess && rolesGetted.data) {
      setUsers(rolesGetted.data.data);
    }
  }, [rolesGetted.isSuccess, rolesGetted.data, setUsers]);
}
