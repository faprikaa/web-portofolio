/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig
