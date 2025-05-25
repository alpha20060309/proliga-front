import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { staticPath } from 'app/utils/static.util'
import { selectTopPlayers } from 'app/lib/features/player/player.selector'
import { getUrl } from 'app/utils/static.util'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const RankingPlayers = () => {
  const { t } = useTranslation()
  const topPlayers = useSelector(selectTopPlayers)

  return (
    <div className="bg-background text-foreground w-full rounded-xl p-5">
      <h3 className="text-xl font-bold">
        {t('Eng kuchli top 3 - futbolchilar')}
      </h3>
      <div className="xs:grid-cols-3 mt-4 grid grid-cols-2 gap-2">
        {topPlayers?.length > 0 ? (
          topPlayers?.map((player, index) => (
            <PlayerPlace
              key={player?.id || index}
              player={player}
              index={index}
            />
          ))
        ) : (
          <div>{t('Oyinchilar yoq')}</div>
        )}
      </div>
    </div>
  )
}

const PlayerPlace = ({ player, index }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const image = useMemo(
    () => staticPath + '/player-png/' + player?.slug + '/app.png',
    [player?.slug]
  )

  return (
    <div className="relative min-h-32 rounded-sm bg-neutral-100 p-2">
      <div className="flex items-center justify-between">
        <img
          src={getUrl(image)}
          alt="player"
          width={24}
          height={24}
          onError={(e) => (e.target.src = '/images/placeholder-user.png')}
          className="size-6 rounded-full md:size-8"
        />
        <span className="bg-primary text-accent-foreground flex h-6 w-12 items-center justify-center rounded-full text-xs font-bold sm:text-sm">
          {player?.point ?? 0}
        </span>
      </div>
      <h4 className="text-accent-foreground line-clamp-2 max-w-28 text-sm font-bold break-words">
        {getCorrectName({ lang, uz: player?.name, ru: player?.name_ru })}
      </h4>
      <p className="text-accent-foreground line-clamp-2 max-w-28 text-sm font-medium break-words">
        {getCorrectName({
          lang,
          uz: player?.club?.name,
          ru: player?.club?.name_ru,
        })}
      </p>
      <span className="bg-primary text-accent-foreground absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-tl-lg rounded-br-lg text-sm font-extrabold">
        {index + 1}
      </span>
    </div>
  )
}

export default RankingPlayers
