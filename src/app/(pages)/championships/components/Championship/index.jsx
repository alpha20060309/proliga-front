import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { formatDate } from 'app/utils/formatDate.util'
import { cn } from '@/lib/utils'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import CompetitionModal from '../Modal/index'
import { selectTeams } from 'app/lib/features/team/team.selector'
import { getUrl } from 'app/utils/static.util'

const Championship = ({ game }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const teams = useSelector(selectTeams)
  const { lang } = useSelector((state) => state.systemLanguage)
  const [isModalOpen, setModalOpen] = useState(false)
  const currentGame = useMemo(
    () => teams?.find((team) => team.competition_id === game.id),
    [game?.id, teams]
  )

  const handleClick = () => {
    if (!game?.is_active) {
      return toast.info(t('This league is not active.'))
    }
    if (!currentGame) {
      switch (game?.can_register) {
        case true:
          return setModalOpen(true)
        case false:
          return toast.info(t('You cannot register in this league'))
        default:
          return null
      }
    }

    return router.push(`/play/${game.id}/${currentGame.id}`)
  }

  const condition = useMemo(() => {
    if (!game?.is_active)
      return 'border-neutral-600 hover:shadow-neutral-600 shadow-md cursor-default'
    if (currentGame)
      return 'border-primary/80 hover:shadow-primary shadow-lg cursor-pointer hover:border-primary'
    return game.can_register
      ? 'border-white/60 hover:shadow-primary hover:border-primary cursor-pointer shadow-lg'
      : 'border-neutral-700 hover:shadow-neutral-700 cursor-default shadow-md'
  }, [currentGame, game?.can_register, game?.is_active])

  return (
    <>
      <article
        className={cn(
          'relative flex h-28 items-center gap-4 overflow-hidden rounded-lg border',
          'px-3 transition-all active:shadow-lg',
          condition
        )}
        onClick={handleClick}
      >
        <img
          src={getUrl(game.flag)}
          alt={game.title}
          className="z-10 size-14 select-none rounded-xl bg-neutral-100 p-1"
          draggable={false}
          loading="lazy"
        />
        <div>
          <h3 className="select-none text-base font-bold capitalize md:text-lg xl:text-xl">
            {getCorrectName({ lang, uz: game?.name, ru: game?.name_ru })}
          </h3>
          {renderGameStatus(game, currentGame, t)}
        </div>
      </article>
      {game.can_register && (
        <CompetitionModal
          toggleModal={setModalOpen}
          isModalOpen={isModalOpen}
          competition={game}
        />
      )}
    </>
  )
}

const renderGameStatus = (game, currentGame, t) => {
  if (!game?.is_active) {
    return (
      <div className="mt-1 flex select-none items-center gap-2 text-xs text-neutral-400 sm:text-sm">
        <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-300">
          {t('Inactive')}
        </span>
        <p>{t('Tez Kunda')}</p>
      </div>
    )
  }

  if (currentGame || game?.can_register) {
    return (
      <div className="flex select-none gap-1 text-xs text-neutral-400 sm:text-sm">
        <p>{t('Deadline')}:</p>
        <span className="text-primary">{formatDate(game?.deadline)}</span>
      </div>
    )
  }

  return (
    <div className="mt-1 flex select-none items-center gap-2 text-xs text-neutral-400 sm:text-sm">
      <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 capitalize text-yellow-300">
        {t('closed')}
      </span>
      <p>{t('Registration Ended')}</p>
    </div>
  )
}

export default Championship
