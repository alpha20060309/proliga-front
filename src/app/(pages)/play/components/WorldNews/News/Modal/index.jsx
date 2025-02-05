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
import { useSelector } from 'react-redux'

export default function ArticleModal({ item, toggleModal, isModalOpen, date }) {
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()

  return (
    <Dialog open={isModalOpen} onOpenChange={toggleModal}>
      <DialogContent className="w-full max-w-4xl rounded-lg bg-black p-3 md:p-4 2xl:max-w-5xl">
        <DialogTitle className="text-xl font-semibold leading-tight tracking-tight">
          {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
        </DialogTitle>
        <div className="text-muted-foreground flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <CalendarDays className="mr-1 size-5" />
            <time dateTime={date}>{date}</time>
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 size-5 text-neutral-200" />
            <span>
              {item.view_count || 0} {t('views')}
            </span>
          </div>
        </div>
        <ScrollArea className="h-[75vh] rounded bg-neutral-900">
          <div
            className="modal-news bg-transparent px-1 py-2 xs:px-2 xs:py-3 2xl:p-4"
            dangerouslySetInnerHTML={{
              __html: getCorrectName({
                lang,
                uz: item?.desc,
                ru: item?.desc_ru,
              }),
            }}
            lang={lang}
          />
        </ScrollArea>
        <DialogDescription className="hidden">{item.desc}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
