'use client'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const PromotionWinPrizes = () => {
  const { t } = useTranslation()
  const prizes = useSelector(selectPrizes)

  if (prizes?.length === 0) return null

  return (
    <Card className="border-border relative h-full flex-1">
      <CardContent>
        <div className="mb-4 space-y-2">
          <h2 className="promotion-header font-bold uppercase">
            {t('Sovrinlarni yutib oling')}
          </h2>
          <p className="promotion-text">{t('Eng ko‘p ball')}</p>
        </div>
        <div className="grid gap-2 lg:gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {prizes
            ?.slice(0, 4)
            .map(
              (prize, index) =>
                prize?.image && <Prize prize={prize} key={index} />
            )}
        </div>
      </CardContent>
    </Card>
  )
}

const Prize = ({ prize }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  return (
    <div className="flex aspect-square flex-col items-center">
      <p className="text-foreground mb-1 text-lg md:mb-2 xl:text-xl">
        {getCorrectName({ lang, uz: prize?.name, ru: prize?.name_ru })}
      </p>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-1 lg:p-2">
        <Image
          src={prize?.image}
          alt={prize?.name}
          width={300}
          height={300}
          loading="lazy"
          draggable={false}
          className="aspect-auto size-64 sm:size-72 md:size-80 bg-cover select-none"
        />
      </div>
    </div>
  )
}

export default PromotionWinPrizes
