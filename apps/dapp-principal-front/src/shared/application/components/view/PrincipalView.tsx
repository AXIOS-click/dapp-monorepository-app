import { ProtectedRoute } from "@/shared/infrastructure/route/ProtectedRoute";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}></Route>
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
