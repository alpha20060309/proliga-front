import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { CalendarDays, Eye } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from 'app/utils/formatDate.util'
import { selectCurrentNews } from 'app/lib/features/news/news.selector'
import { setNewsModal } from 'app/lib/features/news/news.slice'
import { memo } from 'react'

function ArticleModal() {
  const dispatch = useDispatch()
  const currentNews = useSelector(selectCurrentNews)
  const { isModalOpen } = useSelector((store) => store.news)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()
  const date = formatDate(currentNews?.created_at, 'news')

  const setModalOpen = () => {
    dispatch(setNewsModal(false))
  }

  return (
    <Dialog open={isModalOpen && currentNews?.id} onOpenChange={setModalOpen}>
      <DialogContent className="w-full max-w-4xl rounded-lg bg-black p-3 md:p-4 2xl:max-w-5xl">
        <DialogTitle className="text-xl font-normal leading-tight tracking-wide">
          {getCorrectName({
            lang,
            uz: currentNews?.name,
            ru: currentNews?.name_ru,
          })}
        </DialogTitle>
        <div className="text-muted-foreground flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <CalendarDays className="mr-1 size-5" />
            <time dateTime={date}>{date}</time>
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 size-5 text-neutral-200" />
            <span>
              {currentNews?.view_count || 0} {t('views')}
            </span>
          </div>
        </div>
        <ScrollArea className="h-[75vh] rounded bg-neutral-900">
          <div
            className="modal-news bg-transparent px-1 py-2 xs:px-2 xs:py-3 2xl:p-4"
            dangerouslySetInnerHTML={{
              __html: getCorrectName({
                lang,
                uz: currentNews?.desc,
                ru: currentNews?.desc_ru,
              }),
            }}
            lang={lang}
          />
        </ScrollArea>
        <DialogDescription className="hidden">
          {currentNews?.desc}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default memo(ArticleModal)
