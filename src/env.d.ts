/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly APPWRITE_ENDPOINT: string
  readonly APPWRITE_PROJECT_ID: string
  readonly APPWRITE_API_KEY: string
  readonly FRONTEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
