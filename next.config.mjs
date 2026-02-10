/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
      { protocol: 'https', hostname: 'www.svgrepo.com' },
      { protocol: 'https', hostname: 'svgl.app' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
