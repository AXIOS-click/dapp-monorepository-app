import { lazy } from "react";

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: lazy(
      () =>
        import("@/features/dashboard/application/pages/PrincipalDashboardPage")
    ),
    authority: [],
  },
];
