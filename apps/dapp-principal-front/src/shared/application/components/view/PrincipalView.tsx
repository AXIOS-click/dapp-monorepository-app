import { appConfig } from "@/core/config/app.config";
import { protectedRoutes } from "@/infrastructure/route/protectedRoutes";
import { publicRoutes } from "@/infrastructure/route/publicRoutes";
import AppRoute from "@/shared/infrastructure/route/AppRoute";
import { ProtectedRoute } from "@/shared/infrastructure/route/ProtectedRoute";
import PublicRoute from "@/shared/infrastructure/route/PublicRoute";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const { authenticatedEntryPath } = appConfig;

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {/*
          Aqui aun me falta el guard
        */}
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute routeKey={route.key} component={route.component} />
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
