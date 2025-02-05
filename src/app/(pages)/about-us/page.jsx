'use client'

import Gutter from 'components/Gutter'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetPage } from 'app/hooks/system/useGetPage/useGetPage'
import { Skeleton } from '@/components/ui/skeleton'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const AboutUs = () => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const { getPage, data, isLoading } = useGetPage()

  useEffect(() => {
    getPage('about-us')
  }, [getPage])

  return (
    <Gutter>
      {isLoading ? (
        <AboutUsSkeleton />
      ) : (
        <div
          className="html-page my-6 min-h-[40vh] w-full rounded-xl bg-neutral-900/75 px-2 py-4 text-sm shadow-md shadow-neutral-600 sm:p-4 md:p-6 xl:text-base"
          dangerouslySetInnerHTML={{
            __html: getCorrectName({ lang, ru: data?.ru, uz: data?.uz }),
          }}
        />
      )}
    </Gutter>
  )
}

export const AboutUsSkeleton = () => {
  return (
    <div className="mx-auto my-6 min-h-[40vh] w-full max-w-4xl rounded-xl bg-neutral-900/75 px-2 py-4 shadow-md shadow-neutral-600 sm:p-4 md:p-6">
      <Skeleton className="mx-auto mb-4 h-6 w-3/5 sm:w-1/2 xl:w-2/5" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />

      <Skeleton className="mb-4 mt-6 h-6 w-2/3" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-4/5" />

      <Skeleton className="mb-4 mt-6 h-6 w-1/2" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-11/12" />
    </div>
  )
}

export default AboutUs
