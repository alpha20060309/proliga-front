import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect, useMemo } from 'react'
import { useUpdateTeamPlayers } from 'app/hooks/transfer/useUpdateTeamPlayers/useUpdateTeamPlayers'
import { setCaptain } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { useState } from 'react'
import { useUpdateTeam } from 'app/hooks/transfer/useUpdateTeam/useUpdateTeam'
import { setTab } from 'app/lib/features/tour/tour.slice'
import { TABS } from 'app/utils/tabs.util'
import { revertTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import { useUpdateTourTeam } from 'app/hooks/transfer/useUpdateTourTeam/useUpdateTourTeam.index'
import { useAutoGenerateTeamPlayers } from 'app/hooks/transfer/useAutoGenerateTeamPlayers/useAutoGenerateTeamPlayers'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { setTransferModal } from 'app/lib/features/currentTeam/currentTeam.slice'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'
import { CONFIG_KEY } from 'app/utils/config.util'
import {
  selectPrevTeam,
  selectTeamConcat,
} from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { selectPlayers } from 'app/lib/features/player/player.selector'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

const TransferStadiumForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const teamConcat = useSelector(selectTeamConcat)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const userTable = useSelector(selectUserTable)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const players = useSelector(selectPlayers)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const { playersCount, teamPrice } = useSelector((state) => state.teamPlayer)
  const prevTeam = useSelector(selectPrevTeam)
  const { lang } = useSelector((state) => state.systemLanguage)
  const config = useSelector(selectSystemConfig)

  const [teamCreateBtns, toggleTeamCreateBtns] = useState(false)

  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'
  const {
    updateTeamPlayers,
    isLoading: playersLoading,
    error: playersError,
  } = useUpdateTeamPlayers()
  const {
    updateTourTeam,
    isLoading: tourTeamLoading,
    error: tourTeamError,
  } = useUpdateTourTeam()
  const {
    generateTeamPlayers,
    isLoading: teamPlayersLoading,
    error: teamPlayersError,
  } = useAutoGenerateTeamPlayers()
  const {
    updateTeam,
    isLoading: teamLoading,
    error: teamError,
  } = useUpdateTeam()

  const isLoading = useMemo(
    () =>
      playersLoading || tourTeamLoading || teamPlayersLoading || teamLoading,
    [playersLoading, tourTeamLoading, teamPlayersLoading, teamLoading]
  )

  const error = useMemo(
    () => playersError || tourTeamError || teamPlayersError || teamError,
    [playersError, tourTeamError, teamPlayersError, teamError]
  )

  const handleAutoGenerateTeamPlayers = async () => {
    await generateTeamPlayers({ team_id: currentTeam.id, players, currentTeam })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const prevTeamPlayersId = []
    const curTeamPlayersId = []
    const captains = []

    if (!validPlayers()) return

    prevTeam.forEach((p) => p.name && prevTeamPlayersId.push(p.player_id))

    teamConcat.forEach((player) => {
      player.is_captain && captains.push(player.player_id)
      player.name && curTeamPlayersId.push(player.player_id)
    })

    if (captains.length !== 1) {
      toast.warning(t('Kapitan tanlanmagan'), { theme: 'dark' })
      return
    }

    if ((currentTeam?.balance || 0) < teamPrice) {
      toast.error(t('Balansingiz yetarli emas'), { theme: 'dark' })
      return
    }

    if (!validTeamStructure()) return

    let difference = curTeamPlayersId.filter(
      (x) => !prevTeamPlayersId.includes(x)
    )
    const countOfTransfers =
      (difference.length || 0) + currentTourTeam?.current_count_of_transfers

    if (
      currentTeam?.is_team_created &&
      currentTeam?.count_of_transfers < countOfTransfers
    ) {
      toast.error(t('Siz limitdan oshiq transfer amalga oshiraolmaysiz'))
      dispatch(revertTeamPlayers())
      transfer_show_modals && dispatch(setTransferModal(true))
      return
    }

    if (!currentTeam?.is_team_created) {
      await updateTeam({
        team_id: currentTeam.id,
        is_team_created: currentTeam?.is_team_created,
      })
    } else {
      await updateTourTeam({
        team_id: currentTeam.id,
        tour_id: currentTour.id,
        count_of_transfers: countOfTransfers,
      })
    }

    await updateTeamPlayers({
      team: teamConcat,
      team_id: currentTeam.id,
      tour_id: currentTour.id,
      userTable,
      currentCompetition,
    })

    if (!error && !isLoading) {
      dispatch(setTab(TABS.GameProfile))
      toast.success(t('Jamoa muvaffaqiyatli yangilandi'), { theme: 'dark' })
    }
  }

  useEffect(() => {
    if (currentTeam?.is_team_created === false) {
      toggleTeamCreateBtns(true)
    }
  }, [currentTeam])

  const validPlayers = () => {
    let valid = true

    teamConcat.forEach((player) => {
      if (!player.name || !player.price) {
        toast.warning(
          t('identifikatori bolgan va holatida bolgan oyinchi yaroqsiz')
            .replace('$', player?.id)
            .replace('*', getCorrentPlayerPosition(player?.position, lang)),
          { theme: 'dark' }
        )
        return (valid = false)
      }
    })

    return valid
  }

  const validTeamStructure = () => {
    if (
      playersCount.GOA !== 1 ||
      playersCount.DEF < 3 ||
      playersCount.DEF > 5 ||
      playersCount.MID < 3 ||
      playersCount.MID > 5 ||
      playersCount.STR < 2 ||
      playersCount.STR > 3
    ) {
      toast.error(t('Jamoa formatsiyasi notogri'), { theme: 'dark' })
      return false
    }
    return true
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex justify-between gap-x-0 text-black xs:gap-x-0.5 sm:gap-x-1"
    >
      <Select
        name="formation"
        id="formation"
        value={teamConcat.find((player) => player.is_captain)?.player_id ?? ''}
        onValueChange={(value) => dispatch(setCaptain(value))}
      >
        <SelectTrigger className="h-10 w-full min-w-36 max-w-56 rounded border-neutral-400 bg-neutral-950 px-2 text-xs text-neutral-100 hover:border-primary 2xs:min-w-44 xs:text-sm md:text-base">
          <SelectValue placeholder={t('Kapitan tanlang')} />
        </SelectTrigger>
        <SelectContent>
          {teamConcat.map(
            (player) =>
              player.name && (
                <SelectItem
                  value={player.player_id}
                  key={player.id}
                  selected={player.is_captain}
                >
                  {getCorrectName({
                    lang,
                    uz: player?.player?.name,
                    ru: player?.player?.name_ru,
                  })}
                </SelectItem>
              )
          )}
        </SelectContent>
      </Select>
      <div className="flex w-full justify-center gap-0.5 xs:gap-1">
        {teamCreateBtns && (
          <Button
            onClick={handleAutoGenerateTeamPlayers}
            type="button"
            variant="default"
            title="Avto jamoa yigish"
            className="flex w-full min-w-5 max-w-10 items-center justify-center gap-1 rounded border border-neutral-400 bg-neutral-950 px-2 text-neutral-100 transition-all hover:border-primary sm:w-full sm:max-w-max"
          >
            <Image
              src="/icons/auto.svg"
              alt="auto assemble team"
              width={24}
              height={24}
              draggable={false}
              className="filter-white size-6"
            />
          </Button>
        )}
        <Button
          type="button"
          variant="default"
          onClick={() => dispatch(revertTeamPlayers())}
          title={t('orqaga qaytish')}
          className="flex w-full max-w-10 items-center justify-center gap-1 rounded border border-neutral-400 bg-neutral-950 px-2 text-neutral-100 transition-all hover:border-primary sm:w-full sm:max-w-max"
        >
          <Image
            src="/icons/revert.svg"
            alt="auto assemble team"
            width={24}
            height={24}
            draggable={false}
            className="filter-white size-6 h-auto w-auto"
          />
        </Button>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-10 min-w-24 rounded border border-yellow-500 bg-neutral-950 text-sm font-medium text-neutral-100 transition-all hover:border-black hover:bg-yellow-500 hover:text-black 2xs:min-w-28 xs:min-w-28 sm:min-w-32 md:text-base"
      >
        {isLoading ? (
          <Image
            src="/icons/loading.svg"
            width={24}
            height={24}
            alt="loading"
            className="mx-auto size-6 animate-spin"
          />
        ) : (
          t('Saqlash')
        )}
      </Button>
    </form>
  )
}

export default TransferStadiumForm
