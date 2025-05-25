import { DialogTitle } from '@/components/ui/dialog'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { formatDate } from 'app/utils/formatDate.util'
import { useSelector } from 'react-redux'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'

const MatchEventHeader = ({ started_date }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const currentCompetition = useSelector(selectCurrentCompetition)

  return (
    <section className="relative h-min border-b border-white/10 p-4">
      <DialogTitle className="text-center text-xl font-semibold">
        {getCorrectName({
          lang,
          uz: currentCompetition?.name,
          ru: currentCompetition?.name_ru,
        })}
      </DialogTitle>
      <div className="mt-1 flex justify-center gap-2 text-center text-sm text-gray-400">
        <time>{formatDate(started_date, 'notifications')}</time>
      </div>
    </section>
  )
}

export default MatchEventHeader
