declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_OZOW_API_URL: string;
    NEXT_PUBLIC_OZOW_SITE_CODE: string;
    NEXT_PUBLIC_OZOW_PRIVATE_KEY: string;
    NEXT_PUBLIC_OZOW_TEST_MODE: 'true' | 'false';
    NEXT_PUBLIC_OZOW_CANCEL_URL?: string;
    NEXT_PUBLIC_OZOW_SUCCESS_URL?: string;
    NEXT_PUBLIC_OZOW_NOTIFY_URL?: string;
    OZOW_PRIVATE_KEY: string;
  }
}
