import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { useConfigSchematics } from "@/features/data-core/application/hooks/useConfigSchematics";
import { useRoles } from "@/features/roles/application/hooks/useGetRoles";
import { FC, lazy, Suspense, useMemo } from "react";
import { ChargePage } from "../components/custom/ChargePage";

const layouts = {
  AuthenticatedLayout: lazy(() => import("./AuthLayout")),
  PublicLayout: lazy(() => import("./PublicLayout")),
};

export const PrincipalLayout: FC = () => {
  const { signedUser: authenticated } = AuthStore();

  useRoles();
  useConfigSchematics();

  const AppLayout = useMemo(() => {
    return authenticated ? layouts.AuthenticatedLayout : layouts.PublicLayout;
  }, [authenticated]);
  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <ChargePage />
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  );
};
