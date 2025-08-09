import MotionNumber from 'components/MotionNumber'
import TeamBalanceModal from './Modal'
import { MoveUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setBalanceModal } from 'lib/features/currentTeam/currentTeam.slice'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { analytics } from 'utils/analytics.util'
import { useMetrica } from 'next-yandex-metrica'
import { PACKAGE_TYPE } from 'utils/packages.util'

const TeamBalance = () => {
  const { reachGoal } = useMetrica()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { balanceModal, teamPrice } = useSelector((store) => store.teamPlayer)
  const currentTeam = useSelector(selectCurrentTeam)

  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  const handleClick = () => {
    reachGoal(analytics.seePackage, { type: PACKAGE_TYPE.team_balance })
    dispatch(setBalanceModal(!balanceModal))
  }

  return (
    <>
      <div
        className="group w-full cursor-pointer capitalize lg:w-auto"
        onClick={handleClick}
      >
        <header className="text-muted-foreground group-hover:text-foreground flex cursor-pointer transition-all group-hover:underline">
          <h3
            title="Maksimum sotib olish mumkin bolgan o'yinchilar"
            className="text-xs sm:text-xs lg:text-xs 2xl:text-sm"
          >
            {t('Balans')}
          </h3>
          <MoveUp className="text-muted-foreground group-hover:text-foreground xs:size-4 size-3.5 translate-x-0 rotate-45 self-center transition-all group-hover:translate-x-1" />
        </header>
        <p className="text-foreground text-2xl font-bold xl:text-3xl">
          <MotionNumber value={teamBalance || 0} />
        </p>
      </div>
      <TeamBalanceModal />
    </>
  )
}

export default TeamBalance
