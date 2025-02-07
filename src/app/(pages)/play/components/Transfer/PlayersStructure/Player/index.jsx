'use client'

import ConfirmationModal from 'components/ConfirmationModal'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTeamPlayer,
  setPlayerTransferModal,
} from 'app/lib/features/teamPlayers/teamPlayers.slice'
import { staticPath } from 'app/utils/static.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { useTranslation } from 'react-i18next'
import { setCurrentPlayer } from 'app/lib/features/players/players.slice'

const Player = ({ player }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const currentTeam = useSelector(selectCurrentTeam)
  const clubPath = useMemo(
    () => (player.name ? player?.club_id?.slug : ''),
    [player]
  )
  const tShirt = staticPath + '/club-svg/' + clubPath + '/app.svg'
  const firstName = player.name ? player?.name?.split(' ')[0] : ''
  const lastName = player?.name?.split(' ')[1] ?? ''

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
              <button onClick={handleTransfer}>
                <Image
                  width={16}
                  height={16}
                  draggable={false}
                  src="/icons/swap.svg"
                  alt="additional info"
                  className="size-3.5 rounded bg-black p-[1px] transition-all hover:bg-primary xs:size-4 md:size-5 2xl:size-[18px]"
                />
              </button>
              <div className="flex h-3.5 w-6 cursor-default items-center justify-center rounded bg-white text-center text-[11px] font-bold shadow shadow-neutral-600 xs:h-4 xs:w-8 xs:text-xs md:h-5 md:text-sm">
                {player.price ?? '00'}
              </div>
              <button onClick={toggleDeleteModal}>
                <Image
                  width={16}
                  height={16}
                  src="/icons/close-red-circle.svg"
                  alt="delete player"
                  className="size-3.5 rounded transition-all hover:opacity-75 xs:size-4 md:size-5 2xl:size-[18px]"
                />
              </button>
            </div>
          </>
        )}
      </div>
      <ConfirmationModal
        onConfirm={handleDeletePlayer}
        onCancel={toggleDeleteModal}
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </>
  )
}

export default Player
