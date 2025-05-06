'use client'

import Gutter from 'components/Gutter'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetPage } from 'app/hooks/system/useGetPage/useGetPage'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import AboutUsSkeleton from './AboutUsSkeleton'

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

export default AboutUs
