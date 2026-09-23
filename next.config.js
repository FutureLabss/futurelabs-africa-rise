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
      // Old and duplicate routes: one URL per page for search engines.
      { source: '/ai-hackathon', destination: '/vibecode', permanent: true },
      { source: '/hackathon', destination: '/vibecode', permanent: true },
      { source: '/event-details', destination: '/events', permanent: true },
    ];
  },
};

export default nextConfig;

