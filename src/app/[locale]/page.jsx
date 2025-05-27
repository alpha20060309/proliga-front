import Hero from 'components/Hero'
import Promotions from 'components/Promotions'

async function Home({ params }) {
  return (
    <>
      <Hero params={params} />
      <Promotions />
    </>
  )
}

export default Home
