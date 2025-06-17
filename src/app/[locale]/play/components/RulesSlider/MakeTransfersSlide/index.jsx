import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

const MakeTransfersSlide = () => {
  const { t } = useTranslation()
  return (
    <Card>
      <CardContent className="align-center flex flex-col">
        <h2 className="carousel-header xs:justify-start xs:text-start self-center text-center font-bold uppercase">
          {t('Transferlarni amalga oshiring')}
        </h2>
        <p className="xs:text-sm text-muted-foreground mt-4 self-center text-center text-xs md:w-3/4 lg:text-base xl:mt-8 xl:text-lg">
          {t('Agar sizning jamoangizdagi')}
        </p>
        <div className="mx-auto mt-10 w-full flex-1 md:w-auto md:items-center md:justify-center">
          <Image
            width={536}
            height={193}
            src="/images/promotion-transfer.png"
            alt="transfer players"
            className="mx-auto w-full md:mx-0 md:h-48 xl:h-64"
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default MakeTransfersSlide
