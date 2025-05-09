import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "/src/app/sw.ts",
  swDest: "public/sw.js",
  // eslint-disable-next-line
  // disable: process.env.NODE_ENV === "development",
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
  swcMinify: true,
}

export default withSerwist(nextConfig);
