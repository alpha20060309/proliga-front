import Gutter from '../../../../../components/Gutter'
import BigBanner from 'components/Banners/Big'
import MiniBanner from 'components/Banners/Mini'
import Matches from './Matches'
import News from './News'

const WorldNews = () => {
  return (
    <Gutter>
      <section className="mb-2 flex min-h-160 flex-col justify-between gap-2 py-4 lg:flex-row">
        <Matches />
        <section className="relative mx-auto h-min flex-col items-center justify-between overflow-hidden md:flex lg:mx-0">
          <MiniBanner />
          <BigBanner />
        </section>
        <News />
      </section>
    </Gutter>
  )
}

export default WorldNews
