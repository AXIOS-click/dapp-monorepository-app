import React, { FC, lazy, Suspense, useMemo } from 'react';

const layouts = {
  AuthenticatedLayout: lazy(() => import('./AuthLayout')),
  PublicLayout: lazy(() => import('./PublicLayout')),
};

export const PrincipalLayout: FC = () => {
  const { authenticated } = {
    authenticated: false,
  }; // TODO: esto debe ser reemplazado por el hook de autenticación

  const AppLayout = useMemo(() => {
    return authenticated ? layouts.AuthenticatedLayout : layouts.PublicLayout;
  }, [authenticated]);
  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <p>Loading</p>
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  );
};
