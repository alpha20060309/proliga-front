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
          <p className="text-shadow line-clamp-1 text-[10px] text-white xs:text-[11px] xs:text-xs md:text-sm">
            {firstName} {lastName.slice(0, 1).toUpperCase()} {lastName && '.'}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              onClick={handleInfoModal}
              className="size-4 rounded bg-black transition-all hover:bg-primary sm:size-5"
            >
              <Image
                width={16}
                height={16}
                draggable={false}
                src="/icons/info.svg"
                alt="additional info"
                className="h-full w-full"
              />
            </button>
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
