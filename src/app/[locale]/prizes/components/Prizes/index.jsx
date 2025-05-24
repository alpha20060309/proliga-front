'use client'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { CompetitionSkeleton } from '../PrizesSkeleton'
import { PrizesSkeleton } from '../PrizesSkeleton'

const PrizesTitle = dynamic(() => import('../PrizesTitle'), {
  ssr: false,
  loading: () => <Skeleton className="mb-4 h-12 w-48 bg-neutral-500" />,
})
const PrizeCompetition = dynamic(() => import('../Competition'), {
  ssr: false,
  loading: () => <CompetitionSkeleton />,
})
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'

const PrizesSection = () => {
  const { t } = useTranslation()
  const competition = useSelector(selectCompetition)
  const prizes = useSelector(selectPrizes)
  const { isLoading: competitionLoading } = useSelector(
    (store) => store.competition
  )
  const { isLoading: prizesLoading } = useSelector((store) => store.prize)

  const isLoading = useMemo(
    () => competitionLoading || prizesLoading,
    [competitionLoading, prizesLoading]
  )

  return (
    <>
      {isLoading ? (
        <PrizesSkeleton />
      ) : prizes?.length > 0 ? (
        <>
          <PrizesTitle />
          <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:grid-rows-2">
            {competition?.map((competition, index) => (
              <PrizeCompetition competition={competition} key={index} />
            ))}
          </section>
        </>
      ) : (
        <h1 className="text-center text-2xl">{t('Hozircha yutuqlar yoq')}</h1>
      )}
    </>
  )
}

export default PrizesSection
