import { appConfig } from "@/core/config/app.config";
import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const { signedUser: authenticated } = AuthStore();

  return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />;
};

export default PublicRoute;
