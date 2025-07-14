import type { NextConfig } from "next";

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kiaf.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'static-edge.kiaf.org',
        port: '',
      },
    ],

  }
};

export default withNextIntl(nextConfig);
