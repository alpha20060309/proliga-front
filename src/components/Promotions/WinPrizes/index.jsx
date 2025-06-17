'use client'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const PromotionWinPrizes = () => {
  const { t } = useTranslation()
  const prizes = useSelector(selectPrizes)

  if (prizes?.length === 0) return null

  return (
    <Card className="border-border relative h-full flex-1">
      <CardContent className="flex flex-col gap-2 md:gap-4">
        <CardTitle className="xs:text-xl text-lg font-bold uppercase md:text-2xl xl:text-3xl">
          {t('Sovrinlarni yutib oling')}
        </CardTitle>
        <CardDescription className="xs:text-base text-sm md:text-lg lg:text-lg xl:text-xl">
          {t('Eng ko‘p ball')}
        </CardDescription>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-0">
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
    <div className="flex aspect-square flex-col items-center gap-1 lg:gap-2">
      <h4 className="text-foreground text-lg xl:text-xl">
        {getCorrectName({ lang, uz: prize?.name, ru: prize?.name_ru })}
      </h4>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-1 lg:p-2">
        <Image
          src={prize?.image}
          alt={prize?.name}
          width={300}
          height={300}
          loading="lazy"
          draggable={false}
          className="aspect-auto size-56 bg-cover select-none  xl:size-64 2xl:size-80"
        />
      </div>
    </div>
  )
}

export default PromotionWinPrizes
