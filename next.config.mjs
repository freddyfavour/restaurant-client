/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // disables ESLint checks during builds/dev
    ignoreDuringBuilds: true,
  },
  typescript: {
    // disables type checking in dev
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
