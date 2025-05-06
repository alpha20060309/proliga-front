import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "/app/sw.ts",
  swDest: "public/sw.js",
  // eslint-disable-next-line no-undef
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

export default withSerwist({
  reactStrictMode: false,
});
