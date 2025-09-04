import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://foodish-api.com/images/**'),
      new URL('https://dessertsmate.com/wp-content/uploads/**'),
    ],
  },
}

export default nextConfig
