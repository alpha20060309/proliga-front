'use client'

import { fetchNews } from 'app/lib/features/news/news.thunk'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useMemo } from 'react'
import { NewsSkeleton } from './Skeleton'
import { cn } from '@/lib/utils'
import { Pagination } from 'components/Table/Pagination'
import { selectNews } from 'app/lib/features/news/news.selector'
import { Button } from '@/components/ui/button'
import { RefreshCcw, Newspaper } from 'lucide-react'
import Article from './Article'
import NewsArticle from 'components/Modals/NewsArticle'

const News = () => {
  const dispatch = useDispatch()
  const { isLoading, count } = useSelector((store) => store.news)
  const news = useSelector(selectNews)
  const [page, setPage] = useState(0)
  const perPage = 5
  const { t } = useTranslation()
  const pages = useMemo(() => Math.ceil(count / perPage), [count, perPage])

  useEffect(() => {
    dispatch(fetchNews({ page, perPage }))
  }, [dispatch, page, perPage])

  const refreshData = () => {
    dispatch(fetchNews({ page, perPage }))
  }

  if (isLoading) {
    return (
      <NewsSkeleton count={perPage} paginationCount={pages < 5 ? pages : 5} />
    )
  }

  return (
    <div
      className={cn(
        'relative mx-auto flex h-min min-h-[42rem] w-full max-w-lg flex-col',
        'items-stretch justify-between rounded-xl bg-neutral-950 p-4 md:p-6 lg:mx-0 lg:w-auto',
        'gap-2 border border-neutral-600 lg:min-w-72 lg:flex-1'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-100">
          <Newspaper className="size-6" />
          {t('Yangiliklar')}
        </h3>
        <Button
          onClick={refreshData}
          variant="outline"
          size="sm"
          className="h-8 py-0 text-sm text-neutral-200 hover:text-neutral-100"
        >
          <RefreshCcw className="mr-2 size-4" />
          {t('Refresh')}
        </Button>
      </div>
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        {news?.map((item) => (
          <Article key={item.id} item={item} />
        ))}
        {news?.length === 0 && (
          <p className="mt-2 text-center text-neutral-300">
            {t('Yangiliklar mavjud emas!')}
          </p>
        )}
      </div>
      <Pagination
        onPageChange={setPage}
        currentPage={page}
        totalPages={pages}
      />
      <NewsArticle />
    </div>
  )
}

export default News
