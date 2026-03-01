declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface PwaOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
  }

  const nextPwa: (options?: PwaOptions) => (config: NextConfig) => NextConfig;

  export default nextPwa;
}
