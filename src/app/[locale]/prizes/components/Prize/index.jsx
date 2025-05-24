'use client'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { getUrl } from 'app/utils/static.util'

const Prize = ({ prize }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center transition-all hover:scale-[1.025]">
      <p className="mb-1 text-sm md:mb-2 xl:text-base">
        {getCorrectName({ lang, uz: prize?.name, ru: prize?.name_ru })}
      </p>
      <div className="flex aspect-square max-w-64 items-center justify-center overflow-hidden rounded-lg bg-white p-1 lg:p-2 2xl:max-w-80">
        <img
          src={getUrl(prize?.image)}
          loading="lazy"
          alt={prize?.name}
          className="aspect-auto h-auto w-auto bg-cover"
        />
      </div>
      <p className="text-lg">
        <span className="text-3xl font-bold md:text-xl">{prize.order}</span>
        {'-'}
        {t("O'RIN")}
      </p>
    </div>
  )
}

export default Prize
