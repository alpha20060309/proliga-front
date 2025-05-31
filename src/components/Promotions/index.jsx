import PromotionCompete from './Compete'
import PromotionCreateTeam from './CreateTeam'
import PromotionGatherPoints from './GatherPoints'
import PromotionMakeTransfers from './MakeTransfers'
import PromotionWinPrizes from './WinPrizes'
import Gutter from 'shared/Gutter'
import { cn } from '@/lib/utils'
import initTranslations from 'app/lib/i18n'

const Promotions = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)

  return (
    <>
      <Wrapper className="bg-card-foreground/10">
        <PromotionCreateTeam t={t} />
      </Wrapper>
      <Wrapper className={'bg-card-foreground/30'}>
        <PromotionGatherPoints t={t} />
      </Wrapper>
      <Wrapper className={'bg-card-foreground/10'}>
        <PromotionMakeTransfers t={t} />
      </Wrapper>
      <Wrapper className={'bg-card-foreground/30'}>
        <PromotionCompete t={t} />
      </Wrapper>
      <Wrapper className={'bg-card-foreground/10'}>
        <PromotionWinPrizes />
      </Wrapper>
    </>
  )
}

const Wrapper = ({ children, className }) => {
  return (
    <section
      className={cn(
        'bg-background/95 py-6 md:py-8 xl:py-10 2xl:py-12',
        className
      )}
    >
      <Gutter>{children}</Gutter>
    </section>
  )
}

export default Promotions
