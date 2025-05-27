'use client'

import Confirmation from 'components/Modals/Confirmation'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTeamPlayer,
  setPlayerTransferModal,
} from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { staticPath } from 'app/utils/static.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { useTranslation } from 'react-i18next'
import { setCurrentPlayer } from 'app/lib/features/player/player.slice'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { memo } from 'react'

const Player = ({ player }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const currentTeam = useSelector(selectCurrentTeam)
  const clubPath = useMemo(
    () => (player.name ? player?.club_id?.slug : ''),
    [player]
  )
  const { lang } = useSelector((store) => store.systemLanguage)

  const name = getCorrectName({
    lang,
    uz: player?.player?.name,
    ru: player?.player?.name_ru,
  })

  const tShirt = staticPath + '/club-svg/' + clubPath + '/app.svg'
  const firstName = player.name ? name?.split(' ')[0] : ''
  const lastName = name?.split(' ')[1] ?? ''

  const imageErr = (e) => {
    e.target.src = '/icons/player.svg'
  }

  const handleDeletePlayer = () => {
    dispatch(
      deleteTeamPlayer({
        player,
        t,
        is_team_created: currentTeam?.is_team_created,
      })
    )
    toggleDeleteModal()
  }

  const handleTransfer = () => {
    dispatch(setCurrentPlayer(player?.player_id))
    dispatch(setPlayerTransferModal(true))
  }

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen)
  }

  return (
    <>
      <div className="fade-in-fast text-muted-foreground relative z-30 flex h-min flex-col items-center justify-center text-sm select-none sm:text-base">
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
            <div className="xs:size-8 relative size-7 md:size-10 lg:size-8 xl:size-10">
              <Image
                src={tShirt || ''}
                alt="player tshirt"
                width={48}
                height={48}
                onClick={handleTransfer}
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
            <p className="text-3xs text-secondary-foreground xs:text-2xs xs:text-xs line-clamp-1 text-shadow-2xs text-shadow-black md:text-sm">
              {firstName} {lastName.slice(0, 1).toUpperCase()} {lastName && '.'}
            </p>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={handleTransfer}
                className="hover:border-primary border-border size-4 overflow-hidden rounded-sm border transition-all sm:size-5"
              >
                <Image
                  width={16}
                  height={16}
                  draggable={false}
                  src="/icons/swap.svg"
                  alt="additional info"
                  className="h-full w-full"
                />
              </button>
              <div className="border-border bg-background text-foreground flex h-4 w-6 cursor-default items-center justify-center rounded-sm border text-center text-xs font-bold sm:h-5 sm:w-8 md:text-sm">
                {player.price ?? '00'}
              </div>
              <button
                onClick={toggleDeleteModal}
                className="border-border hover:border-primary size-4 rounded-sm border transition-all sm:size-5"
              >
                <Image
                  width={16}
                  height={16}
                  src="/icons/close-red-circle.svg"
                  alt="delete player"
                  className="h-full w-full"
                />
              </button>
            </div>
          </>
        )}
      </div>
      <Confirmation
        onConfirm={handleDeletePlayer}
        onCancel={toggleDeleteModal}
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </>
  )
}

export default memo(Player)
