import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useMemo } from 'react'
import { setCaptain } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'
import Image from 'next/image'
import { useUpdateTeamCaptains } from 'app/hooks/transfer/useUpdateTeamCaptains/useUpdateTeamCaptains'
import { selectTeamConcat } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const ProfileStadiumForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const userTable = useSelector(selectUserTable)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const teamConcat = useSelector(selectTeamConcat)
  const { playersCount } = useSelector((state) => state.teamPlayer)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam)
  const { currentTour, isLoading: tourLoading } = useSelector(
    (state) => state.tour
  )
  const { updateTeamCaptains, isLoading: captainsLoading } =
    useUpdateTeamCaptains()

  const isLoading = useMemo(
    () => teamLoading || tourLoading || captainsLoading,
    [captainsLoading, teamLoading, tourLoading]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const captains = []
    if (!validPlayers()) return

    teamConcat.forEach((player) => {
      if (player.is_captain) {
        captains.push(player.player_id)
      }
    })

    if (captains.length !== 1) {
      toast.warning(t('Kapitan tanlanmagan'), { theme: 'dark' })
      return
    }

    if (!validTeamStructure()) return

    await updateTeamCaptains({
      team: teamConcat,
      team_id: currentTeam.id,
      tour_id: currentTour.id,
      userTable,
      currentCompetition,
    })
  }

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
      className="mt-2 flex justify-between gap-x-1 text-black"
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

export default ProfileStadiumForm
