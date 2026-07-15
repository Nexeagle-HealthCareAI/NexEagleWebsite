/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // During migration, ignore TypeScript and ESLint build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
