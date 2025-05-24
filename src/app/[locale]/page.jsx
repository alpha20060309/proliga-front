// import { useEffect } from 'react'
// import { useGenerateLanguage } from './hooks/system/useGenerateLanguage/useGenerateLanguage'

import Hero from 'components/Hero'

import Promotions from 'components/Promotions'
import TranslationsProvider from 'app/providers/Translations.provider'
import initTranslations from 'app/lib/i18n'

async function Home({ params }) {
  const { locale } = await params
  const { resources } = await initTranslations(locale)

  // const { generate } = useGenerateLanguage()

  // useEffect(() => {
  //   const fetch = async () => await generate()
  //   fetch()
  // }, [generate])

  return (
    <TranslationsProvider locale={locale} resources={resources}>
      <Hero />
      <Promotions />
    </TranslationsProvider>
  )
}

export default Home
