/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      // ['@swc-jotai/react-refresh', {}],
      ['@swc-jotai/debug-label', {}],
    ],
  },
  transpilePackages: ['jotai-devtools'],
};

module.exports = nextConfig;
