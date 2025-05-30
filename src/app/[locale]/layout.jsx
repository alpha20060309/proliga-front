import '../globals.css'
import 'react-phone-number-input/style.css'
import Navbar from 'components/Navbar'
import { DM_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ViewTransitions } from 'next-view-transitions'
import { Toaster } from '@/components/ui/sonner'
import Footer from 'components/Footer'
import { fontVariables } from '../fonts'
import RootProvider from 'app/providers/Root.provider'
import initTranslations from 'app/lib/i18n'
import TranslationsProvider from 'app/providers/Translations.provider'

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
})

export const metadata = {
  title:
    "Futbol fantasy: O'zbekiston, Angliya, Ispaniya, Italiya va Chempionlar ligasi turnirlari proliga.uz saytida",
  description:
    "O'zbekiston Fantasy Futbol Ligasi rasmiy veb-sayti. Chempionatlar, o'yinlar, natijalar va futbol yangiliklari.",
  keywords:
    "proliga, o'zbekiston futboli, professional liga, futbol, superliga, pro liga, proliga.uz, Proliga.uz, fantasy futbol, fantasy futbol uz",
  authors: [{ name: 'Proliga' }],
  creator: 'Proliga',
  publisher: 'Proliga',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://proliga.uz',
    title:
      "Futbol fantasy: O'zbekiston, Angliya, Ispaniya, Italiya va Chempionlar ligasi turnirlari proliga.uz saytida",
    description:
      "O'zbekiston Fantasy Futbol Ligasi rasmiy veb-sayti. Chempionatlar, o'yinlar, natijalar va futbol yangiliklari.",
    siteName: 'Proliga',
    images: [
      {
        url: '/Screenshot.png',
        width: 1912,
        height: 989,
        alt: 'Proliga Screenshot',
      },
    ],
  },
  // eslint-disable-next-line no-undef
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  twitter: {
    card: 'summary_large_image',
    title:
      "Futbol fantasy: O'zbekiston, Angliya, Ispaniya, Italiya va Chempionlar ligasi turnirlari proliga.uz saytida",
    description:
      "O'zbekiston Fantasy Futbol Ligasi rasmiy veb-sayti. Chempionatlar, o'yinlar, natijalar va futbol yangiliklari.",
    images: ['/Screenshot.png'],
  },
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params
  const { resources } = await initTranslations(locale)

  return (
    <ViewTransitions>
      <html lang={locale} dir={'ltr'} suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://proliga.uz/static/theme.css" />
        </head>
        <body
          className={cn(
            'bg-background text-foreground min-h-svh scroll-smooth antialiased lg:min-h-screen',
            dmSans.className,
            fontVariables
          )}
        >
          <TranslationsProvider locale={locale} resources={resources}>
            <Toaster className="text-foreground" />
            <RootProvider>
              <Navbar />
              {children}
              <Footer />
            </RootProvider>
          </TranslationsProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
