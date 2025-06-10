/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_NAME: string
  readonly VITE_PROJECT_DESCRIPTION: string
  readonly VITE_PROJECT_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
