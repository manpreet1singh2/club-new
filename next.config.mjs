/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react", "framer-motion"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig