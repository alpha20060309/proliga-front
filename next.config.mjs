import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.js',
  swDest: 'public/sw.js',
  scope: '/',
  register: true,
  // eslint-disable-next-line no-undef
  disable: process.env.NODE_ENV === 'development',
  cacheOnNavigation: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proliga.uz',
      },
    ],
  },
}

export default withSerwist(nextConfig)
