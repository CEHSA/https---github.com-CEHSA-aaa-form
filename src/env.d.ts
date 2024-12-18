/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_OZOW_SITE_CODE: string
  readonly VITE_OZOW_PRIVATE_KEY: string
  readonly VITE_OZOW_API_KEY: string
  readonly VITE_OZOW_IS_TEST: string
  readonly VITE_OZOW_API_URL?: string
  readonly VITE_OZOW_CANCEL_URL?: string
  readonly VITE_OZOW_SUCCESS_URL?: string
  readonly VITE_OZOW_NOTIFY_URL?: string
  readonly VITE_OZOW_TEST_MODE?: string
  readonly VITE_LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
