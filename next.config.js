/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
  env: {
    API_URL: process.env.API_URL,
    NEXT_URL: process.env.NEXT_URL,
  },
};

module.exports = nextConfig;
