import RulesSlider from './components/RulesSlider'
import Gutter from 'shared/Gutter'
import Matches from './components/Matches'
import BigBanner from 'components/Banners/Big'
import MiniBanner from 'components/Banners/Mini'
import News from './components/News'

const PlayFooter = () => {
  return (
    <Gutter>
      <section className="flex min-h-160 flex-col justify-between gap-2 py-4 lg:flex-row">
        <Matches />
        <section className="relative mx-auto h-min flex-col items-center justify-between overflow-hidden md:flex lg:mx-0">
          <MiniBanner />
          <BigBanner />
        </section>
        <News />
      </section>
      <RulesSlider />
    </Gutter>
  )
}

export default PlayFooter
