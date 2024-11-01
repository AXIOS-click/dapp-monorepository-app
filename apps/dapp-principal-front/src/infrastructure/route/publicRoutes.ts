import { lazy } from "react";

export const publicRoutes = [
  {
    key: "sign-in",
    path: "/sign-in",
    component: lazy(
      () => import("@/features/auth/application/pages/LoginPage")
    ),
    authority: [],
  },
];
