import { Theme } from "@radix-ui/themes";
import React, { FC } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

interface ConfigContainerProps {
  children: React.ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

export const ConfigContainer: FC<ConfigContainerProps> = ({ children }) => {
  const queryClient = makeQueryClient();
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Theme>
  );
};
