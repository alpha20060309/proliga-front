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
    <section className="bg-card">
      <Gutter className={'border-border'}>
        <PromotionCreateTeam t={t} />
        <PromotionGatherPoints t={t} />
        <PromotionMakeTransfers t={t} />
        <PromotionCompete t={t} />
        <PromotionWinPrizes />
      </Gutter>
      {/* <Gutter className={'bg-background my-2 max-h-[46rem]'}></Gutter>
      <Gutter className={'bg-background my-2 max-h-[44rem]'}></Gutter>
      <Gutter className={'bg-background my-2 max-h-[44rem]'}></Gutter>
      <Gutter className={'bg-background my-2 max-h-[44rem]'}></Gutter>
      <Gutter className={'bg-background my-2'}></Gutter> */}
    </section>
  )
}

export default Promotions
