import { lazy } from "react";

export type authority = "DASHBOARD" | "USUARIOS" | "REPORTERÍA";

export interface Route {
  key: string;

  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  authority: authority[];
}

export const protectedRoutes: Route[] = [
  {
    key: "home",
    path: "/home",
    component: lazy(
      () =>
        import("@/features/dashboard/application/pages/PrincipalDashboardPage")
    ),
    authority: ["DASHBOARD"],
  },
];
