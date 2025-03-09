'use client'

// import { useEffect } from 'react'
import dynamic from 'next/dynamic'
// import { useGenerateLanguage } from './hooks/system/useGenerateLanguage/useGenerateLanguage'
import HeroSkeleton from 'components/Hero/HeroSkeleton'
const Hero = dynamic(() => import('../components/Hero'), {
  loading: () => <HeroSkeleton />,
  ssr: false,
})
const Promotions = dynamic(() => import('../components/Promotions'), {
  ssr: false,
})

function Home() {
  // const { generate } = useGenerateLanguage()

  // useEffect(() => {
  //   const fetch = async () => await generate()
  //   fetch()
  // }, [generate])

  return (
    <>
      {/* <OfflinePage /> */}
      <Hero />
      <Promotions />
    </>
  )
}

export default Home
