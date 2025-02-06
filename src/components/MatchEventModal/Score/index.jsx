import { selectCurrentMatch } from 'app/lib/features/matches/matches.selector'
import { Timer } from 'lucide-react'
import { useSelector } from 'react-redux'
import { staticPath, getUrl } from 'app/utils/static.util'
import { useMemo } from 'react'

const MatchEventScore = () => {
  const currentMatch = useSelector(selectCurrentMatch)

  const homeImg = useMemo(
    () =>
      staticPath +
      '/club-jpeg/' +
      currentMatch?.home_club_id?.slug +
      '/logo.jpeg',
    [currentMatch?.home_club_id?.slug]
  )
  const awayImg = useMemo(
    () =>
      staticPath +
      '/club-jpeg/' +
      currentMatch?.away_club_id?.slug +
      '/logo.jpeg',
    [currentMatch?.away_club_id?.slug]
  )

  console.log(currentMatch)

  return (
    <section className="bg-gradient-to-r from-blue-800/20 via-yellow-800/20 to-red-800/20 py-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-[40%] flex-col items-center justify-center gap-2 text-center">
          <img
            src={getUrl(homeImg)}
            alt="Arsenal"
            className="size-16 rounded-full"
          />
          <h3 className="font-bold">{currentMatch?.home_club_id?.name}</h3>
        </div>
        <div className="flex w-[20%] flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-neutral-50">2</span>
            <span className="text-4xl font-light text-gray-400">:</span>
            <span className="text-4xl font-bold text-neutral-50">1</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm text-green-400">
            <Timer className="h-4 w-4" />
            <span>90`+4</span>
          </div>
        </div>
        <div className="flex w-[40%] flex-col items-center justify-center gap-2 text-center">
          <img
            src={getUrl(awayImg)}
            alt="Manchester City"
            className="size-16 rounded-full"
          />
          <h3 className="font-bold">{currentMatch?.away_club_id?.name}</h3>
        </div>
      </div>
    </section>
  )
}

export default MatchEventScore
