import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "/src/app/sw.ts",
  swDest: "public/sw.js",
  scope: "/",
  include: [
    "/",
    "/manifest.json",
    "/favicon.ico",
    "/offline",
    "/**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}",
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['proliga.uz'],
  },
}

export default withSerwist(nextConfig);
