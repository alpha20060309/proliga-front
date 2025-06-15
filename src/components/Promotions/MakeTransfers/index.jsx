import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const PromotionMakeTransfers = ({ t }) => {
  return (
    <Card className="border-border relative h-full flex-1">
      <CardContent className="align-center flex flex-col bg-cover">
        <h2 className="promotion-header xs:justify-start xs:text-start self-center text-center font-bold uppercase">
          {t('Transferlarni amalga oshiring')}
        </h2>
        <p className="promotion-text text-muted-foreground mt-2 self-center text-center md:w-3/4 lg:mt-6 xl:mt-10">
          {t('Agar sizning jamoangizdagi')}
        </p>
        <div className="mx-auto mt-4 w-full flex-1 md:w-auto md:items-center md:justify-center lg:mt-10">
          <Image
            width={540}
            height={200}
            src="/images/promotion-transfer.png"
            alt="transfer players"
            className="mx-auto h-full w-full md:mx-0"
            unoptimized
            draggable={false}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionMakeTransfers
