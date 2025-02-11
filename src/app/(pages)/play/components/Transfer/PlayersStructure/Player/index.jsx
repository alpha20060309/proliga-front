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
      <div className="fade-in-fast relative z-30 flex h-min select-none flex-col items-center justify-center text-sm text-neutral-700 sm:text-base">
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
            <div className="relative size-7 xs:size-8 md:size-10 lg:size-8 xl:size-10">
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
            <p className="text-shadow line-clamp-1 text-[10px] text-white xs:text-[11px] xs:text-xs md:text-sm">
              {firstName} {lastName.slice(0, 1).toUpperCase()} {lastName && '.'}
            </p>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={handleTransfer}
                className="size-4 overflow-hidden rounded border border-neutral-900 transition-all hover:border-primary sm:size-5"
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
              <div className="flex h-4 w-6 cursor-default items-center justify-center rounded border border-neutral-800 bg-neutral-50 text-center text-xs font-bold text-neutral-950 sm:h-5 sm:w-8 md:text-sm">
                {player.price ?? '00'}
              </div>
              <button
                onClick={toggleDeleteModal}
                className="size-4 rounded border border-neutral-900 transition-all hover:border-primary sm:size-5"
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
