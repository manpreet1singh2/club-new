/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  eslint:     { ignoreDuringBuilds: !isProd },
  typescript: { ignoreBuildErrors: !isProd },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  compress: true,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options',         value: 'DENY' },
        { key: 'X-Content-Type-Options',   value: 'nosniff' },
        { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security',value: 'max-age=31536000; includeSubDomains' },
      ],
    }]
  },
}

export default nextConfig
