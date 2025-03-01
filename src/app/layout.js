'use client'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-phone-number-input/style.css'
import './lib/i18n.config'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
import RootProvider from './providers/Root.provider'
import { DM_Sans } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
})

export default function RootLayout({ children }) {
  const { i18n } = useTranslation()

  return (
    <html lang={i18n.language || 'uz'}>
      <head>
        <title>
          Futbol fantasy: O&apos;zbekiston, Angliya, Ispaniya, Italiya va
          Chempionlar ligasi turnirlari proliga.uz saytida
        </title>
        <meta
          name="title"
          content="Futbol fantasy: O'zbekiston, Angliya, Ispaniya, Italiya va Chempionlar
        ligasi turnirlari proliga.uz saytida"
        />
        <meta
          name="description"
          content="O'zbekiston Fantasy Futbol Ligasi rasmiy veb-sayti. Chempionatlar, o'yinlar, natijalar va futbol yangiliklari."
        />
        <meta
          name="description"
          content="Proliga Fantasy Futbol - bu vertual futbol o'yini bo'lib, unda ishtirokchilar haqiqiy futbol ligalarining haqiqiy o'yinchilariga asoslangan vertual jamoalarning murabbiylari bo'lishadi. Ushbu o'yinda ishtirokchilar futbolchilarnii tanlash orqali o'z jamoalarini yaratadilar va haqiqiy o'yinlariga qarab ochko oladilar. "
        />

        {/* Additional Meta Tags */}
        <meta
          name="keywords"
          content="proliga, o'zbekiston futboli, professional liga, futbol, superliga, pro liga, proliga.uz, Proliga.uz, fantasy futbol, fantasy futbol uz"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Uzbek" />
        <meta name="language" content="Russian" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <RootProvider>
        <body
          className={cn(
            'dark min-h-svh scroll-smooth bg-black text-white antialiased md:min-h-screen',
            dmSans.className
          )}
        >
          <Navbar />
          {children}
          <ToastContainer theme="dark" pauseOnHover />
          <Footer />
        </body>
      </RootProvider>
    </html>
  )
}
