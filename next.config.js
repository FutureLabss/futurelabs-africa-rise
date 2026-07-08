/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/ai-hackathon',
        destination: '/ai-fellowship',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


