'use client'

import PromotionCompete from './Compete'
import PromotionCreateTeam from './CreateTeam'
import PromotionGatherPoints from './GatherPoints'
import PromotionMakeTransfers from './MakeTransfers'
import PromotionWinPrizes from './WinPrizes'
import { useSelector } from 'react-redux'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'

const Promotions = () => {
  const prizes = useSelector(selectPrizes)

  return (
    <>
      <PromotionCreateTeam />
      <PromotionGatherPoints />
      <PromotionMakeTransfers />
      <PromotionCompete />
      {prizes?.length > 0 && <PromotionWinPrizes />}
    </>
  )
}

export default Promotions
