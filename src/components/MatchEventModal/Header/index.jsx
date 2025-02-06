import { DialogTitle } from '@/components/ui/dialog'
import { MATCH_STATUS } from 'app/utils/players.util'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { formatDate } from 'app/utils/formatDate.util'
import { useSelector } from 'react-redux'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { useTranslation } from 'react-i18next'

const MatchEventHeader = ({ started_date }) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  const currentCompetition = useSelector(selectCurrentCompetition)

  const renderMatchStatus = (status) => {
    switch (status) {
      case MATCH_STATUS.NOT_STARTED:
        return <p>{t('Boshlanmagan')}</p>
      case MATCH_STATUS.INPROCESS:
        return (
          <p className="animate-pulse text-neutral-400">{t('Jarayonda')}</p>
        )
      case MATCH_STATUS.FINISHED:
        return <p>{t('Tugagan')}</p>
      default:
        return null
    }
  }

  return (
    <section className="relative border-b border-white/10 p-4">
      <DialogTitle className="text-center text-xl font-semibold">
        {getCorrectName({
          lang,
          uz: currentCompetition?.name,
          ru: currentCompetition?.name_ru,
        })}
      </DialogTitle>
      <div className="mt-1 flex justify-center gap-2 text-center text-sm text-gray-400">
        <time>{formatDate(started_date, 'notifications')}</time>
        <span>&#9679;</span>
        {renderMatchStatus(MATCH_STATUS.NOT_STARTED)}
      </div>
    </section>
  )
}

export default MatchEventHeader
