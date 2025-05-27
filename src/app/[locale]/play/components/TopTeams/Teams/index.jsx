import { selectTopTeams } from 'app/lib/features/team/team.selector'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const RankingTeams = () => {
  const { t } = useTranslation()
  const topTeams = useSelector(selectTopTeams)

  return (
    <div className="bg-background text-foreground w-full rounded-xl p-5">
      <h3 className="text-xl font-bold">{t('Eng kuchli top 3 jamoalar')}</h3>
      <div
        className={cn(
          'xs:grid-cols-3 mt-4 h-auto min-h-32 grid-cols-2 gap-2',
          topTeams?.length > 0 && 'grid'
        )}
      >
        {topTeams?.length > 0 ? (
          topTeams?.map((team, index) => (
            <TeamPlace team={team} index={index} key={team?.id || index} />
          ))
        ) : (
          <div className="text-center">Yuqori ochkolik jamoalar yoq</div>
        )}
      </div>
    </div>
  )
}

const TeamPlace = ({ team, index }) => {
  return (
    <div className="bg-white relative min-h-32 rounded-sm p-2">
      <div className="flex items-center justify-between">
        <Image
          src={`/icons/${index + 1}-place.svg`}
          alt="top team place"
          width={24}
          height={24}
          className="size-6 md:size-8"
        />
        <span className="bg-primary text-accent-foreground flex h-6 w-12 items-center justify-center rounded-full text-xs font-bold sm:text-sm">
          {team?.team_point ?? '00'}
        </span>
      </div>
      <h4 className="text-accent-foreground line-clamp-2 max-w-28 text-sm font-bold break-words">
        {team?.team_name ?? 'team'}
      </h4>
      <p className="text-accent-foreground line-clamp-2 max-w-28 text-sm font-medium break-words">
        {team?.user_name}
      </p>
      <span className="bg-primary text-accent-foreground absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-tl-lg rounded-br-lg text-sm font-extrabold">
        {index + 1}
      </span>
    </div>
  )
}

export default RankingTeams
