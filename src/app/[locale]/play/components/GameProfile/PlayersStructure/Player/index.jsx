'use client'

import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { staticPath } from 'app/utils/static.util'
import { selectPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.selector'
import { setPlayerInfoModal } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { setCurrentPlayer } from 'app/lib/features/player/player.slice'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { memo } from 'react'
import { Info } from 'lucide-react'

const Player = ({ player }) => {
  const dispatch = useDispatch()
  const playerPoint = useSelector(selectPlayerPoint)
  const [currentPlayerPoint, setCurrentPlayerPoint] = useState(null)
  const { lang } = useSelector((store) => store.systemLanguage)

  useEffect(() => {
    if (playerPoint?.length > 0) {
      setCurrentPlayerPoint(
        playerPoint.find((item) => item.player_id === player.player_id)
      )
    } else {
      setCurrentPlayerPoint(null)
    }
  }, [playerPoint, player])

  const imageErr = (e) => {
    e.target.src = '/icons/player.svg'
  }

  const handleInfoModal = () => {
    dispatch(setCurrentPlayer(player?.player_id))
    dispatch(setPlayerInfoModal(true))
  }

  const name = getCorrectName({
    lang,
    uz: player?.player?.name,
    ru: player?.player?.name_ru,
  })

  const clubPath = useMemo(
    () => (player.name ? player?.club_id?.slug : ''),
    [player]
  )
  const tShirt = staticPath + '/club-svg/' + clubPath + '/app.svg'
  const firstName = player.name ? name?.split(' ')[0] : ''
  const lastName = name?.split(' ')[1] ?? ''

  return (
    <div className="text-muted-foreground flex h-min flex-col items-center justify-center text-sm select-none sm:text-base">
      {!player.name && (
        <>
          <Image
            src="/icons/player-tshirt.svg"
            alt="player tshirt"
            width={48}
            height={48}
            draggable={false}
            className="xs:size-8 size-6 md:size-10 lg:size-8 xl:size-10"
          />
        </>
      )}
      {player.name && (
        <>
          <div className="xs:size-8 relative size-6 md:size-10 lg:size-8 xl:size-10">
            <Image
              src={tShirt}
              alt="player tshirt"
              width={48}
              onClick={handleInfoModal}
              height={48}
              onError={imageErr}
              draggable={false}
              className="h-full w-full"
            />
            {player.is_captain && (
              <Image
                src="/icons/captain-badge.svg"
                alt="captain"
                width={16}
                height={16}
                draggable={false}
                className="absolute -right-1 bottom-0 size-3 md:size-4 2xl:size-5"
              />
            )}
          </div>
          <p className="text-white xs:text-2xs xs:text-xs text-3xs line-clamp-1 text-shadow-player md:text-sm">
            {firstName} {lastName.slice(0, 1).toUpperCase()} {lastName && '.'}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              onClick={handleInfoModal}
              className="bg-background group hover:bg-primary size-4 rounded-full transition-all sm:size-5"
            >
              <Info className="text-foreground group-hover:text-accent-foreground size-4 sm:size-5" />
            </button>
            <div className="bg-primary border-primary-foreground text-primary-foreground flex h-4 w-6 cursor-default items-center justify-center rounded-sm border text-center text-xs font-bold sm:h-5 sm:w-8 md:text-sm">
              {player.is_captain
                ? (currentPlayerPoint?.point ?? 0) * 2
                : (currentPlayerPoint?.point ?? 0)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(Player)
