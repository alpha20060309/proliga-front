import ArticleModal from '../Modal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate } from 'app/utils/formatDate.util'
import { CalendarDays, Eye } from 'lucide-react'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useUpdateNewsView } from 'app/hooks/system/useUpdateNewsView/useUpdateNewsView'
import { getUrl } from 'app/utils/static.util'

const Article = ({ item }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const [isModalOpen, setModalOpen] = useState(false)
  const { updateNewsView } = useUpdateNewsView()
  const date = formatDate(item?.created_at, 'news')

  const handleClick = () => {
    setModalOpen(true)
    setTimeout(async () => await updateNewsView(item?.id), 3000)
  }

  return (
    <>
      <article
        onClick={handleClick}
        className="group flex h-[100px] w-auto overflow-hidden rounded bg-white/10 hover:cursor-pointer"
      >
        <div className="flex aspect-video h-full w-24 items-center justify-center md:w-36">
          <img
            src={getUrl(item?.image) || ''}
            alt={item.name}
            className="aspect-video h-full rounded"
          />
        </div>
        <div className="flex h-full w-full flex-col space-y-1 px-2 py-1">
          <h4 className="line-clamp-3 h-full w-auto max-w-full flex-1 break-all text-sm text-neutral-200 hover:underline">
            {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
          </h4>
          <div className="flex w-full flex-wrap items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-neutral-300">
              <div className="flex items-center gap-1">
                <CalendarDays className="size-4" />
                <time dateTime={date}>{date}</time>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="size-4 text-neutral-200" />
                <span>{item.view_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <ArticleModal
        toggleModal={() => setModalOpen(!isModalOpen)}
        item={item}
        date={date}
        isModalOpen={isModalOpen}
      />
    </>
  )
}

export default Article
