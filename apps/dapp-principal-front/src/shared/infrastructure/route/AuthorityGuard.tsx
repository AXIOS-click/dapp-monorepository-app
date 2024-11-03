import { RolesStore } from "@/features/roles/application/stores/RolesStore";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type AuthorityGuardProps = PropsWithChildren<{
  userAuthority?: string[];
  authority?: string[];
}>;

const AuthorityGuard = (props: AuthorityGuardProps) => {
  const { allRoles } = RolesStore();
  const { userAuthority = [], authority = [], children } = props;

  console.log("allRoles", allRoles);

  const roleMatched = userAuthority.some((userRole) => {
    const role = allRoles?.find((role) => role.name === userRole);
    if (!role) return false;

    return authority.every((auth) => role.modules.includes(auth));
  });

  return <>{roleMatched ? children : <Navigate to="/access-denied" />}</>;
};

export default AuthorityGuard;
