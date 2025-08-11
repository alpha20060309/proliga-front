import TeamMaxTransfersModal from './Modal'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setTransferModal } from 'lib/features/currentTeam/currentTeam.slice'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTourTeam } from 'lib/features/tourTeam/tourTeam.selector'
import MotionNumber from 'components/MotionNumber'
import { MoveUp } from 'lucide-react'
import { useMetrica } from 'next-yandex-metrica'
import { analytics } from 'utils/analytics.util'
import { PACKAGE_TYPE } from 'utils/packages.util'

const TeamMaxTransfers = () => {
  const dispatch = useDispatch()
  const { reachGoal } = useMetrica()
  const { transferModal } = useSelector((store) => store.currentTeam)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const { t } = useTranslation()

  const currentCountOfTransfers = Number(
    currentTourTeam?.current_count_of_transfers ?? 0
  )
  const maxTransfersFromOneTeam = Number(currentTeam?.count_of_transfers ?? 2)
  const currentTransferCount = maxTransfersFromOneTeam - currentCountOfTransfers

  const handleClick = () => {
    reachGoal(analytics.seePackage, { type: PACKAGE_TYPE.transfer_count })
    dispatch(setTransferModal(!transferModal))
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
            {t('transferlar')}
          </h3>
          <MoveUp className="text-muted-foreground group-hover:text-foreground xs:size-4 size-3.5 translate-x-0 rotate-45 self-center transition-all group-hover:translate-x-1" />
        </header>
        <p className="text-foreground text-2xl font-bold xl:text-3xl">
          <span
            className={
              currentTransferCount === 0
                ? 'text-destructive'
                : 'text-foreground'
            }
          >
            <MotionNumber value={currentTransferCount} />
          </span>
          /
          <MotionNumber value={currentTeam?.count_of_transfers ?? 0} />
        </p>
      </div>
      <TeamMaxTransfersModal />
    </>
  )
}

export default TeamMaxTransfers
