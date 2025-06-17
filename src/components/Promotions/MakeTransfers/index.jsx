import Image from 'next/image'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const PromotionMakeTransfers = ({ t }) => {
  return (
    <Card className="border-border relative h-full flex-1">
      <CardContent className="align-center flex flex-col gap-2 bg-cover sm:gap-4 md:gap-8">
        <CardTitle className="xs:text-xl self-center text-lg font-bold uppercase md:text-2xl xl:text-3xl">
          {t('Transferlarni amalga oshiring')}
        </CardTitle>
        <CardDescription className="xs:text-base w-full max-w-lg self-center text-center text-sm md:text-lg lg:text-lg xl:max-w-xl xl:text-xl">
          {t('Agar sizning jamoangizdagi')}
        </CardDescription>
        <div className="mx-auto w-full flex-1 md:w-auto md:items-center md:justify-center">
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
