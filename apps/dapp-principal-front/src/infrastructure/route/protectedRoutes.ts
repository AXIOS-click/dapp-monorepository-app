import { lazy } from "react";

export type authority =
  | "DASHBOARD"
  | "USUARIOS"
  | "REPORTERÍA"
  | "CONFIGURACIÓN";

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
  {
    key: "home",
    path: "/administrative/users",
    component: lazy(
      () => import("@/features/users/application/pages/UsersAdministration")
    ),
    authority: ["DASHBOARD"],
  },
  {
    key: "home",
    path: "/administrative/roles",
    component: lazy(
      () => import("@/features/roles/application/pages/RolesAdministration")
    ),
    authority: ["DASHBOARD"],
  },
];
