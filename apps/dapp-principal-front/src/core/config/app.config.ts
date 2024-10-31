export type AppConfig = {
  apiUrl: string;
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  enableMock: boolean;
};

export const appConfig: AppConfig = {
  apiUrl: process.env.VITE_PUBLIC_API_URL!,
  apiPrefix: "",
  authenticatedEntryPath: "/home",
  unAuthenticatedEntryPath: "/sign-in",
  locale: "en",
  enableMock: true,
};
