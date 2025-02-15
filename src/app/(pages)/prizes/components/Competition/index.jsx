'use client'

import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import { PrizeSkeleton } from '../PrizesSkeleton'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
const Prize = dynamic(() => import('../Prize'), {
  loading: () => <PrizeSkeleton />,
  ssr: false,
})
import { getUrl } from 'app/utils/static.util'

const PrizeCompetition = ({ competition }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const { isLoading } = useSelector((store) => store.prize)
  const prizes = useSelector(selectPrizes)

  const hasPrize = prizes.some(
    (prize) => prize.competition_id.id === competition.id
  )

  if (!hasPrize) return <></>

  return (
    <article className="transitiona-all flex-1 group flex flex-col rounded-xl border border-neutral-100/50 bg-black/25 p-2 backdrop-blur-sm hover:border-neutral-100 hover:bg-black/40 md:p-4">
      <div className="mb-2 flex items-center gap-2 border-b border-neutral-500/80 pb-2 transition-all group-hover:border-primary">
        <img
          src={getUrl(competition.flag)}
          loading="lazy"
          alt={competition.title}
          className="z-10 size-10 select-none rounded-full bg-white p-1"
          draggable={false}
        />
        <h2 className="text-lg xl:text-xl">
          {getCorrectName({
            lang,
            uz: competition?.name,
            ru: competition?.name_ru,
          })}
        </h2>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-2 lg:flex-row">
          <PrizeSkeleton />
          <PrizeSkeleton />
          <PrizeSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-2 lg:flex-row">
          {prizes.map(
            (prize) =>
              prize.competition_id.id === competition.id && (
                <Prize prize={prize} key={prize.id} />
              )
          )}
        </div>
      )}
    </article>
  )
}

export default PrizeCompetition
