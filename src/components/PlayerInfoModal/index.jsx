'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PlayerStatisticsTable from './Table'
import PlayerPhoto from './PlayerPhoto'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import { selectPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.selector'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'
import { setPlayerInfoModal } from 'app/lib/features/teamPlayers/teamPlayers.slice'
import { selectCurrentPlayer } from 'app/lib/features/players/players.selector'

const PlayerInfoModal = () => {
  const dispatch = useDispatch()
  const currentPlayer = useSelector(selectCurrentPlayer)
  const { infoModal } = useSelector((store) => store.teamPlayers)
  const { lang } = useSelector((store) => store.systemLanguage)
  const playerPoint = useSelector(selectPlayerPoint)
  const [matches, setMatches] = useState([])
  const { t } = useTranslation()

  const setModalOpen = () => {
    dispatch(setPlayerInfoModal(false))
  }

  useEffect(() => {
    if (playerPoint?.length > 0) {
      setMatches([])
      playerPoint.forEach((item) => {
        if (item.player_id === currentPlayer?.id) {
          setMatches((prevMatch) => [...prevMatch, item])
        }
      })
    }
  }, [currentPlayer, playerPoint])

  return (
    <Dialog open={infoModal && currentPlayer?.id} onOpenChange={setModalOpen}>
      <DialogContent className="overflox-y-auto z-50 flex max-h-[90vh] min-h-[50vh] w-full max-w-4xl flex-col gap-4 overflow-y-auto rounded-xl border border-neutral-500 bg-neutral-950 px-2 pb-4 pt-4 text-neutral-200 xs:mx-auto xs:px-4 md:px-6 md:pb-4 md:pt-6 2xl:max-w-5xl">
        <PlayerPhoto
          currentPlayer={currentPlayer}
          position={getCorrentPlayerPosition(
            currentPlayer?.position,
            lang,
            'full'
          )}
        />
        <PlayerStatisticsTable matches={matches} />
        <div className="mt-auto flex flex-wrap justify-center gap-x-1 gap-y-0 text-nowrap text-xs md:gap-x-2 md:text-sm">
          <div>
            <span>{t("QO'")}</span> - {t('Quriq Oyin')},
          </div>
          <div>
            <span>{t('QP')}</span> - {t('Qaytarilagian Penalti')},
          </div>
          <div>
            <span>{t('AG')}</span> - {t('Avto Gol')},
          </div>
          <div>
            <span>{t("O'2")}</span> -{' '}
            {t('O‘tkazib yuborilgan har 2 to‘p farqi')},
          </div>
          <div>
            <span>{t('G')}</span> - {t('Gol')},
          </div>
          <div>
            <span>{t('GA')}</span> - {t('Gol Assist')},
          </div>
          <div>
            <span>{t('SK')}</span> - {t('Sariq kartochka')},
          </div>
          <div>
            <span>{t('QZ')}</span> - {t('Qizil kartochka')},
          </div>
          <div>
            <span>{t('MIN')}</span> - {t('Daqiqani o‘yinda o‘tkazdi')},
          </div>
          <div>
            <span>{t('O')}</span> - {t('Ochko')}
          </div>
        </div>
        <DialogDescription className="hidden">
          Oyinchi haqida malumot
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default PlayerInfoModal
