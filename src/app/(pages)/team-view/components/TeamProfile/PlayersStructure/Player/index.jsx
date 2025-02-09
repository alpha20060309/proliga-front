'use client'

import { selectPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.selector'
import { useSelector } from 'react-redux'
import { useEffect, useState, useMemo } from 'react'
import { staticPath } from 'app/utils/static.util'
import Image from 'next/image'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { memo } from 'react'

const Player = ({ player }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const playerPoint = useSelector(selectPlayerPoint)
  const [currentPlayerPoint, setCurrentPlayerPoint] = useState(null)

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

  const clubPath = useMemo(
    () => (player.name ? player?.club_id?.slug : ''),
    [player]
  )
  const name = getCorrectName({
    lang,
    uz: player?.player?.name,
    ru: player?.player?.name_ru,
  })

  const firstName = player.name ? name?.split(' ')[0] : ''
  const lastName = name?.split(' ')[1] ?? ''
  const tShirt = staticPath + '/club-svg/' + clubPath + '/app.svg'

  return (
    <div className="flex h-min select-none flex-col items-center justify-center text-sm text-neutral-700 sm:text-base">
      {!player.name && (
        <>
          <Image
            src="/icons/player-tshirt.svg"
            alt="player tshirt"
            width={48}
            height={48}
            draggable={false}
            className="size-6 xs:size-8 md:size-10 lg:size-8 xl:size-10"
          />
        </>
      )}
      {player.name && (
        <>
          <div className="relative size-6 xs:size-8 md:size-10 lg:size-8 xl:size-10">
            <Image
              src={tShirt || ''}
              alt="player tshirt"
              width={48}
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
          <p className="text-shadow line-clamp-1 text-[10px] text-white xs:text-[11px] xs:text-xs md:text-sm">
            {firstName} {lastName.slice(0, 1).toUpperCase()} {lastName && '.'}
          </p>
          <div className="flex items-center gap-0.5">
            <div className="flex h-4 w-6 cursor-default items-center justify-center rounded border border-neutral-800 bg-primary text-center text-xs font-bold text-neutral-950 sm:h-5 sm:w-8 md:text-sm">
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
