// import { useEffect } from 'react'
// import { useGenerateLanguage } from './hooks/system/useGenerateLanguage/useGenerateLanguage'

import Hero from 'components/Hero'
import Promotions from 'components/Promotions'

async function Home({ params }) {
  // const { generate } = useGenerateLanguage()

  // useEffect(() => {
  //   const fetch = async () => await generate()
  //   fetch()
  // }, [generate])

  return (
    <>
      <Hero params={params} />
      <Promotions />
    </>
  )
}

export default Home
