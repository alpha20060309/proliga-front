import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "/src/app/sw.ts",
  swDest: "public/sw.js",
  // eslint-disable-next-line
  disable: process.env.NODE_ENV === "development",
  scope: "/",
  include: [
    "/",
    "/offline",
  ],
  additionalPrecacheEntries: [
    {
      url: "/offline",
      revision: "1",
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
}

export default withSerwist(nextConfig);
