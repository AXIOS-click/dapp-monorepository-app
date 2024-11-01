import { appConfig } from "@/core/config/app.config";
import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { REDIRECT_URL_KEY } from "@/shared/application/constants/app.constants";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const { unAuthenticatedEntryPath } = appConfig;

export const ProtectedRoute = () => {
  const { signedUser: authenticated } = AuthStore();

  const location = useLocation();

  if (!authenticated) {
    return (
      <Navigate
        replace
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
      />
    );
  }

  return <Outlet />;
};
