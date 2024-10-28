export type AppConfig = {
  apiUrl: string
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  locale: string
  enableMock: boolean
}

export const appConfig: AppConfig = {
  apiUrl: 'api-url',
  apiPrefix: "",
  authenticatedEntryPath: '/home',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'en',
  enableMock: true,
}

