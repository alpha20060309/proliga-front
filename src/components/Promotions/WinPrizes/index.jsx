'use client'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
import Image from 'next/image'

const PromotionWinPrizes = () => {
  const { t } = useTranslation()
  const prizes = useSelector(selectPrizes)

  if (prizes?.length === 0) return null

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="promotion-header font-bold uppercase">
          {t('Sovrinlarni yutib oling')}
        </h2>
        <p className="promotion-text">{t('Eng ko‘p ball')}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {prizes
          ?.slice(0, 4)
          .map(
            (prize, index) =>
              prize?.image && <Prize prize={prize} key={index} />
          )}
      </div>
    </div>
  )
}

const Prize = ({ prize }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-foreground mb-1 text-lg md:mb-2 xl:text-xl">
        {getCorrectName({ lang, uz: prize?.name, ru: prize?.name_ru })}
      </p>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-1 lg:p-2">
        <Image
          src={prize?.image}
          alt={prize?.name}
          width={280}
          height={280}
          loading="lazy"
          draggable={false}
          className="aspect-auto h-auto w-auto bg-cover select-none"
        />
      </div>
    </div>
  )
}

export default PromotionWinPrizes
