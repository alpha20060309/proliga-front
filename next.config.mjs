import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "/src/sw.js",
  swDest: "public/sw.js",
  scope: "/",
  // disable: process.env.NODE_ENV === 'development',
  include: [
    '/',
    '/manifest.json',
    '/favicon.ico',
    '/offline',
    '/**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}',
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proliga.uz',
      },
    ],
  },
}

export default withSerwist(nextConfig);
