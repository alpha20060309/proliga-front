import '../globals.css'
import 'react-phone-number-input/style.css'
import Navbar from 'shared/Navbar'
import { cn } from 'lib/utils'
import { ViewTransitions } from 'next-view-transitions'
import { Toaster } from 'components/ui/sonner'
import Footer from 'shared/Footer'
import { fontVariables } from '../fonts'
import RootProvider from 'providers/Root.provider'
import initTranslations from 'lib/i18n'
import TranslationsProvider from 'providers/Translations.provider'
import { auth } from 'app/api/auth/[...nextauth]/route'

const APP_NAME = 'Proliga - Fantaziya Futbol Platformasi'
const APP_DESCRIPTION =
  "O'zbekiston Fantaziya Futbol Ligasi - haqiqiy futbol ligalari o'yinchilariga asoslangan virtual futbol o'yini"

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  keywords:
    "proliga, O'zbekiston futboli, professional liga, futbol, superliga, pro liga, proliga.uz, Proliga.uz, fantasy futbol, fantasy futbol uz",
  authors: [{ name: 'Proliga' }],
  creator: 'Proliga',
  publisher: 'Proliga',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
    themeColor: '#000000',
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://proliga.uz',
    title: APP_NAME,
    description: APP_DESCRIPTION,
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
    title: APP_DESCRIPTION,
    description: APP_DESCRIPTION,
    images: ['/Screenshot.png'],
  },
}

export default async function RootLayout({ children, params }) {
  const session = await auth()
  const { locale } = await params
  const { resources } = await initTranslations(locale)
  const userId = session?.user?.id

  // eslint-disable-next-line no-undef
  const staticBaseUrl = process.env.NEXT_PUBLIC_STATIC_URL
  let themePath

  if (session?.user?.user_theme_id && userId) {
    themePath = `/user/${userId}/user.css`
  } else if (session?.user?.theme_id) {
    themePath = `/theme/${session.user.theme_id}.css`
  } else {
    themePath = `/theme/ALL.css`
  }
  const themeURL = `${staticBaseUrl}${themePath}`

  return (
    <ViewTransitions>
      <html lang={locale} dir={'ltr'} suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href={themeURL} />
        </head>
        <body
          className={cn(
            'bg-background text-foreground min-h-svh scroll-smooth font-sans antialiased lg:min-h-screen',
            fontVariables
          )}
        >
          <TranslationsProvider locale={locale} resources={resources}>
            <Toaster />
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
