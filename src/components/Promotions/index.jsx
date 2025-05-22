'use client'

import PromotionCompete from './Compete'
import PromotionCreateTeam from './CreateTeam'
import PromotionGatherPoints from './GatherPoints'
import PromotionMakeTransfers from './MakeTransfers'
import PromotionWinPrizes from './WinPrizes'
import { useSelector } from 'react-redux'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
import Gutter from 'components/Gutter'
import { cn } from '@/lib/utils'

const Promotions = () => {
  const prizes = useSelector(selectPrizes)

  return (
    <>
      <Wrapper className="bg-background/95">
        <PromotionCreateTeam />
      </Wrapper>
      <Wrapper className={'bg-card/80'}>
        <PromotionGatherPoints />
      </Wrapper>
      <Wrapper className={'bg-card'}>
        <PromotionMakeTransfers />
      </Wrapper>
      <Wrapper className={'bg-card/80'}>
        <PromotionCompete />
      </Wrapper>
      {prizes?.length > 0 && (
        <Wrapper className={'bg-card'}>
          <PromotionWinPrizes />
        </Wrapper>
      )}
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
