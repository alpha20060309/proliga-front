import PromotionCompete from './Compete'
import PromotionCreateTeam from './CreateTeam'
import PromotionGatherPoints from './GatherPoints'
import PromotionMakeTransfers from './MakeTransfers'
import PromotionWinPrizes from './WinPrizes'
import Gutter from 'shared/Gutter'
import initTranslations from 'app/lib/i18n'

const Promotions = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)

  return (
    <>
      <Gutter className={'bg-background my-2 max-h-[46rem]'}>
        <PromotionCreateTeam t={t} />
      </Gutter>
      <Gutter className={'bg-background my-2 max-h-[44rem]'}>
        <PromotionGatherPoints t={t} />
      </Gutter>
      <Gutter className={'bg-background my-2 max-h-[44rem]'}>
        <PromotionMakeTransfers t={t} />
      </Gutter>
      <Gutter className={'bg-background my-2 max-h-[44rem]'}>
        <PromotionCompete t={t} />
      </Gutter>
      <Gutter className={'bg-background my-2'}>
        <PromotionWinPrizes />
      </Gutter>
    </>
  )
}

export default Promotions
