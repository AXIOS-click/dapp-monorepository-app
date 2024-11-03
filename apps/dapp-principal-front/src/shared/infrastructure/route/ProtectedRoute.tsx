import { appConfig } from "@/core/config/app.config";
import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

const { unAuthenticatedEntryPath } = appConfig;

export const ProtectedRoute = () => {
  const { signedUser: authenticated } = AuthStore();

  if (!authenticated) {
    return <Navigate replace to={`${unAuthenticatedEntryPath}`} />;
  }

  return <Outlet />;
};
