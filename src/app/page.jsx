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

// "@types/node": "22.13.5",
// "@types/react": "19.0.10",
// "@types/react-dom": "19.0.4",
// "typescript": "5.6.3",
// "typescript-eslint": "8.30.1"

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
