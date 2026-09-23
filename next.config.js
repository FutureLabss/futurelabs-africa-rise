/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Pages folded into the redesigned site keep working for old links and search results.
  async redirects() {
    return [
      { source: '/programs', destination: '/academy', permanent: true },
      { source: '/initiatives', destination: '/about#what-we-build', permanent: true },
      { source: '/impact', destination: '/#impact', permanent: true },
      { source: '/ventures', destination: '/startups', permanent: false },
      { source: '/intelligence', destination: '/research-labs', permanent: false },
    ];
  },
};

export default nextConfig;

