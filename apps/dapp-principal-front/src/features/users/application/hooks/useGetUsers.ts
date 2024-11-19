import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UsersStore } from "../stores/UsersStore";

import { IUserBase } from "../../domain/entities/User";
import { getAllUsers } from "../../infrastructure/services/UserServices";
export function useGetUsers() {
  const { setUsers } = UsersStore();
  const rolesGetted = useQuery<IUserBase[]>({
    queryKey: ["users-getted"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    if (rolesGetted.isSuccess && rolesGetted.data) {
      console.log(rolesGetted.data, "setted");
      setUsers(rolesGetted.data);
    }
  }, [rolesGetted.isSuccess, rolesGetted.data, setUsers]);
}
