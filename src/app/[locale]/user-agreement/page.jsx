'use client'

import Gutter from 'components/Gutter'
import PageSkeleton from 'components/PageSkeleton'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetPage } from 'app/hooks/system/useGetPage/useGetPage'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const UserAgreement = () => {
  const { getPage, data, isLoading } = useGetPage()
  const { lang } = useSelector((store) => store.systemLanguage)

  useEffect(() => {
    getPage('user-agreement')
  }, [getPage])

  return (
    <Gutter>
      {isLoading ? (
        <PageSkeleton />
      ) : (
        <div
          className="html-page my-6 min-h-screen w-full rounded-xl bg-neutral-900/75 px-2 py-4 text-sm shadow-md shadow-neutral-600 sm:p-4 md:p-6 xl:text-base"
          dangerouslySetInnerHTML={{
            __html: getCorrectName({ lang, uz: data?.uz, ru: data?.ru }),
          }}
        />
      )}
    </Gutter>
  )
}

export default UserAgreement
