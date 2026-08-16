/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
