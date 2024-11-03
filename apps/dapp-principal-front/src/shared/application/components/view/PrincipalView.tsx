import { appConfig } from "@/core/config/app.config";
import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { protectedRoutes } from "@/infrastructure/route/protectedRoutes";
import { publicRoutes } from "@/infrastructure/route/publicRoutes";
import AppRoute from "@/shared/infrastructure/route/AppRoute";
import AuthorityGuard from "@/shared/infrastructure/route/AuthorityGuard";
import { ProtectedRoute } from "@/shared/infrastructure/route/ProtectedRoute";
import PublicRoute from "@/shared/infrastructure/route/PublicRoute";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const { authenticatedEntryPath } = appConfig;

const AllRoutes = () => {
  const { userSession } = AuthStore();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthorityGuard
                userAuthority={userSession?.roles}
                authority={route.authority}
              >
                <AppRoute routeKey={route.key} component={route.component} />
              </AuthorityGuard>
            }
          />
        ))}
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute routeKey={route.key} component={route.component} />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export const PrincipalViews = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <p>Loading</p>
        </div>
      }
    >
      <AllRoutes />
    </Suspense>
  );
};
