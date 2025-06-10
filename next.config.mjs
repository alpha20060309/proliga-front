import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.js",
  swDest: "public/sw.js",
  scope: "/",
  register: true,
  cacheOnNavigation: true,
  additionalPrecacheEntries: [{ url: "/~offline", revision: "1" }],
  exclude: [
    "/ru.json",
    "/uz.json",
  ],
  cacheOnNavigation: true,
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